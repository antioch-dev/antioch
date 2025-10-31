'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  type StreamingProxy,
  type SystemStats,
  type UseRealTimeReturn,
} from '../types';
import type { RealTimeUpdate } from '../types/realtime';

export function useRealTime(): UseRealTimeReturn {
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<RealTimeUpdate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const cleanup = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      wsRef.current.onmessage = null;

      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    cleanup();

    try {
      // In a real app, this would connect to your WebSocket server
      const wsUrl = process.env.NODE_ENV === 'development'
        ? 'ws://localhost:3001/ws'
        : 'wss://your-domain.com/ws';

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setConnected(false);
        
        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, Math.min(1000 * reconnectAttemptsRef.current, 30000)); // Exponential backoff, max 30s
        }
      };

      ws.onerror = (error) => {
        const errorMessage = 'WebSocket error: ' + (error instanceof Error ? error.message : 'Unknown error');
        console.error(errorMessage, error);
        setError(errorMessage);
        setConnected(false);
      };

      ws.onmessage = (event: { data: string }) => {
        try {
          const data = JSON.parse(event.data) as RealTimeUpdate;
          setLastUpdate(data);
        } catch (parseError) {
          console.error('Failed to parse WebSocket message:', parseError);
          setError('Invalid message format received');
        }
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setError('Failed to establish connection');
      setConnected(false);
    }
  }, [cleanup]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect');
      wsRef.current = null;
    }

    setConnected(false);
    reconnectAttemptsRef.current = 0;
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not connected');
      return false;
    }
    
    try {
      wsRef.current.send(message);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }, []);

  // Helper function to send RealTimeUpdate objects
 
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    connected,
    lastUpdate,
    error,
    connect,
    disconnect,
    sendMessage,
  };
}

// Specialized hooks for different types of real-time updates
export function useRealTimeProxyUpdates(
  onProxyUpdate: (proxy: StreamingProxy) => void
) {
  const { lastUpdate } = useRealTime();

  useEffect(() => {
    if (lastUpdate?.type === 'proxy_status') {
      onProxyUpdate(lastUpdate?.data);
    }
  }, [lastUpdate, onProxyUpdate]);

  return null;
}

export function useRealTimeStatsUpdates(
  onStatsUpdate: (stats: SystemStats) => void
) {
  const { lastUpdate } = useRealTime();

  useEffect(() => {
    if (lastUpdate?.type === 'system_stats') {
      onStatsUpdate(lastUpdate?.data);
    }
  }, [lastUpdate, onStatsUpdate]);

  return null;
}

export function useRealTimeStreamUpdates(
  onStreamCountUpdate: (proxyId: string, count: number) => void
) {
  const { lastUpdate } = useRealTime();

  useEffect(() => {
    if (lastUpdate?.type === 'stream_count') {
      onStreamCountUpdate(lastUpdate.data.proxyId, lastUpdate.data.count);
    }
  }, [lastUpdate, onStreamCountUpdate]);

  return null;
}

// Mock WebSocket server simulation for development
export function simulateRealTimeUpdates() {
  if (typeof window === 'undefined') return;

  const mockUpdates = [
    {
      type: 'system_stats',
      data: {
        totalProxies: 5,
        activeProxies: 4,
        totalActiveStreams: 3,
        totalBandwidthUsage: 150,
        healthyProxies: 3,
        warningProxies: 1,
        errorProxies: 1,
      } as SystemStats,
      timestamp: new Date(),
    },
    {
      type: 'stream_count',
      data: { proxyId: 'proxy-1', count: 2 },
      timestamp: new Date(),
    },
  ] as RealTimeUpdate[];

  let index = 0;
  setInterval(() => {
    const update = mockUpdates[index % mockUpdates.length];
    window.dispatchEvent(new CustomEvent('mock-websocket-message', {
      detail: update
    }));
    index++;
  }, 5000);
}
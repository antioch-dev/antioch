'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { type SystemStats, type AnalyticsData, type UseStreamingStatsReturn } from '../types';
import { apiClient } from '../api-client';


export function useStreamingStats(): UseStreamingStatsReturn {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timeRange = useRef<'7d' | '30d' | '90d'>('30d');

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsResponse, analyticsResponse] = await Promise.all([
        apiClient.getSystemStats(),
        apiClient.getAnalytics(timeRange.current)
      ]);
      
      setStats(statsResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  const updateStats = useCallback((newStats: SystemStats) => {
    setStats(newStats);
  }, []);

  useEffect(() => {
   void refresh();
  }, [refresh]);

  return {
    stats,
    analytics,
    loading,
    error,
    refresh,
    updateStats,
  };
}
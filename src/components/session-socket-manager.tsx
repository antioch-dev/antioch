"use client";

import { useEffect, useState } from "react";


type ConnectionStatus = "connected" | "connecting" | "disconnected";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface SyncMessage {
  type: "sync" | "leader_action";
  data: unknown;
  timestamp: number;
  action?: string;
}

interface ParticipantsMessage {
  type: "participants";
  data: User[];
}

interface ParticipantStatusMessage {
  type: "participant_status";
  status: string;
  timestamp: number;
}

interface JoinMessage {
  type: "join";
  sessionId: string;
  isLeader: boolean;
  user: User;
}

type WebSocketMessage =
  | SyncMessage
  | ParticipantsMessage
  | ParticipantStatusMessage
  | JoinMessage;

type EventHandler<T = unknown> = (payload: T) => void;

// ---- Mock WebSocket ----
class MockWebSocket {
  private listeners: Record<string, EventHandler[]> = {};
  private isConnected = false;

  constructor(url: string) {
    console.log("Connecting to:", url);

    // Simulate connection
    setTimeout(() => {
      this.isConnected = true;
      this.emit("open", {});
    }, 1000);
  }

  on<T>(event: string, callback: EventHandler<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback as EventHandler);
  }

  emit<T>(event: string, data: T): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  send(message: WebSocketMessage): void {
    console.log("Sending to server:", message);

    // Simulate server response
    setTimeout(() => {
      this.emit("message", {
        type: "sync",
        data: message,
        timestamp: Date.now(),
      } as SyncMessage);
    }, 100);
  }

  close(): void {
    this.isConnected = false;
    this.emit("close", {});
  }
}

// ---- Props ----
interface SessionSocketManagerProps {
  sessionId: string;
  isLeader: boolean;
  onSyncReceived: (data: unknown) => void;
  onParticipantUpdate: (participants: User[]) => void;
  onConnectionStatusChange: (status: ConnectionStatus) => void;
}

// ---- Component ----
export function SessionSocketManager({
  sessionId,
  isLeader,
  onSyncReceived,
  onParticipantUpdate,
  onConnectionStatusChange,
}: SessionSocketManagerProps) {
  const [socket, setSocket] = useState<MockWebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  useEffect(() => {
    const ws = new MockWebSocket(`ws://localhost:3001/session/${sessionId}`);

    ws.on("open", () => {
      setConnectionStatus("connected");
      onConnectionStatusChange("connected");

      ws.send({
        type: "join",
        sessionId,
        isLeader,
        user: {
          id: Math.random().toString(36).substr(2, 9),
          name: "Current User",
          avatar: "CU",
        },
      });
    });

    ws.on<SyncMessage | ParticipantsMessage>("message", (message) => {
      switch (message.type) {
        case "sync":
          if (!isLeader) {
            onSyncReceived(message.data);
          }
          break;
        case "participants":
          onParticipantUpdate(message.data);
          break;
        case "leader_action":
          if (!isLeader) {
            onSyncReceived(message.data);
          }
          break;
      }
    });

    ws.on("close", () => {
      setConnectionStatus("disconnected");
      onConnectionStatusChange("disconnected");
    });

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [sessionId, isLeader, onConnectionStatusChange, onParticipantUpdate, onSyncReceived]);

  // ---- API functions ----
  const sendLeaderAction = (action: string, data: unknown): void => {
    if (socket && isLeader) {
      socket.send({
        type: "leader_action",
        action,
        data,
        timestamp: Date.now(),
      });
    }
  };

  const sendParticipantStatus = (status: string): void => {
    if (socket) {
      socket.send({
        type: "participant_status",
        status,
        timestamp: Date.now(),
      });
    }
  };

  return null; // utility component, no UI
}

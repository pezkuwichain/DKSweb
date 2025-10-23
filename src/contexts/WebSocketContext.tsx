import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WebSocketMessage {
  type: 'comment' | 'vote' | 'sentiment' | 'mention' | 'reply' | 'proposal_update';
  data: any;
  timestamp: number;
}

interface WebSocketContextType {
  isConnected: boolean;
  subscribe: (event: string, callback: (data: any) => void) => void;
  unsubscribe: (event: string, callback: (data: any) => void) => void;
  sendMessage: (message: WebSocketMessage) => void;
  reconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout>();
  const eventListeners = useRef<Map<string, Set<(data: any) => void>>>(new Map());
  const { toast } = useToast();

  const connect = useCallback(() => {
    try {
      // In production, replace with actual WebSocket server URL
      const wsUrl = import.meta.env.VITE_WS_URL || 'wss://pezkuwichain-ws.example.com';
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        setIsConnected(true);
        toast({
          title: "Connected",
          description: "Real-time updates enabled",
        });
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          const listeners = eventListeners.current.get(message.type);
          if (listeners) {
            listeners.forEach(callback => callback(message.data));
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "Connection Error",
          description: "Failed to establish real-time connection",
          variant: "destructive",
        });
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        // Attempt to reconnect after 5 seconds
        reconnectTimeout.current = setTimeout(() => {
          connect();
        }, 5000);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }, [toast]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    if (!eventListeners.current.has(event)) {
      eventListeners.current.set(event, new Set());
    }
    eventListeners.current.get(event)?.add(callback);
  }, []);

  const unsubscribe = useCallback((event: string, callback: (data: any) => void) => {
    eventListeners.current.get(event)?.delete(callback);
  }, []);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }, []);

  const reconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }
    connect();
  }, [connect]);

  return (
    <WebSocketContext.Provider value={{ isConnected, subscribe, unsubscribe, sendMessage, reconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};
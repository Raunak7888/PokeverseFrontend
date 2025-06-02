// lib/hooks/useStompClient.ts
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import backendUrl from "@/components/backendUrl";

let stompClient: Client | null = null;

export function useStompClient(): Client | null {
  const [connectedClient, setConnectedClient] = useState<Client | null>(null);

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      setConnectedClient(stompClient);
      return;
    }

    // Create a SockJS connection to the backend
    const socket = new SockJS(
      `${backendUrl("quiz")}/ws`
    );

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ STOMP connected");
        setConnectedClient(stompClient);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error", frame.headers["message"]);
      },
      onDisconnect: () => {
        console.log("🔌 STOMP disconnected");
        setConnectedClient(null);
      },
    });

    stompClient.activate();

    return () => {
      stompClient?.deactivate();
    };
  }, []);

  return connectedClient;
}

import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";
import { useMultiplayerQuestionStore } from "@/store/multiplayerQuestionStore";
import { Player } from "@/utils/types";

export const useLobbyWebSocket = (
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  roomId: string
) => {
  const router = useRouter();
  const setMultiplayerQuestion = useMultiplayerQuestionStore(
    (state) => state.setMultiplayerQuestion
  );
  const currentQuestionRef = useRef<any>(null); // Use a ref to store the last processed question

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const callbacksRef = useRef({ setPlayers, setMultiplayerQuestion, router });
  useEffect(() => {
    callbacksRef.current = { setPlayers, setMultiplayerQuestion, router };
  }, [setPlayers, setMultiplayerQuestion, router]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const socket = new SockJS("http://localhost:8083/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        setIsConnected(true);

        const id = roomId.replace(/^0+/, "");

        client.subscribe(`/topic/rooms/${id}/game`, (message) => {
          const currentCallbacks = callbacksRef.current;

          if (message.body === "Game started") {
            currentCallbacks.router.push("/quiz/multiplayer/question");
            return;
          }
          if (message.body === "Game ended") {
            currentCallbacks.router.push("/quiz/multiplayer/result");
            return;
          }

          try {
            const msg = JSON.parse(message.body);
            console.log("Received WebSocket message:", msg); // Keep this for debugging if needed

            if (msg?.question && msg?.questionNumber !== undefined) {
              // Only update if the question number or the question ID (if available) has changed
              // This prevents unnecessary updates if the server sends the same question data repeatedly
              if (
                currentQuestionRef.current?.questionNumber === msg.questionNumber &&
                currentQuestionRef.current?.question?.id === msg.question.id // Assuming questions have an 'id'
              ) {
                // console.log("Same question received, skipping update.");
                return; // Skip if it's the same question as the last one processed
              }

              const copy = JSON.parse(JSON.stringify(msg)); // Deep clone to ensure new reference
              currentCallbacks.setMultiplayerQuestion(copy);
              currentQuestionRef.current = copy; // Update the ref with the new question
            } else if (msg.userId && msg.name) {
              currentCallbacks.setPlayers((prev) => {
                if (prev.some((p) => p.userId === msg.userId)) return prev;

                const updatedPlayers = [...prev, msg];
                localStorage.setItem("players", JSON.stringify(updatedPlayers)); // Persist to localStorage
                return updatedPlayers;
              });
            }
          } catch (error) {
            console.error("WebSocket: Error parsing message body:", error, message.body);
          }
        });
      },
      onStompError: (frame) => {
        setIsConnected(false);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    setStompClient(client);
    client.activate();

    return () => {
      
      setIsConnected(false);
      // Clear question on disconnect
    };
  }, [roomId]);

  return { stompClient, isConnected };
};
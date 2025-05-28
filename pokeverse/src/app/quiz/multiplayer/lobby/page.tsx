"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import PokeButton from "@/components/PokemonButton";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ChatComponent from "@/components/chatcomponent";
import { MessagesSquare } from "lucide-react";
import { useRouter } from "next/navigation";

type Player = {
  userId: string;
  name: string;
  profilePicUrl?: string;
};

type Room = {
  id: number;
  name: string;
  maxPlayers: number;
  hostId: number;
  started: boolean;
  ended: boolean;
  maxRound: number;
  currentRound: number;
};

const Lobby = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState("000000");
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  const parseLocalStorage = (key: string) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const enrichPlayers = async (playerList: Player[]): Promise<Player[]> => {
    return Promise.all(
      playerList.map(async (player) => {
        if (player.profilePicUrl?.trim()) return player;

        try {
          const res = await fetch(
            `http://localhost:8082/auth/user/profile/pic/${player.userId}`
          );
          const data = await res.json();
          return {
            ...player,
            profilePicUrl: data?.profilePicUrl?.trim() || "",
          };
        } catch {
          console.error(`Failed to fetch pic for ${player.name}`);
          return { ...player, profilePicUrl: "" };
        }
      })
    );
  };

  const fetchRoomFromServer = async (id: string | number) => {
    try {
      const res = await fetch(
        `http://localhost:8083/api/rooms/${id}/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch room data");
      const data = await res.json();

      const { room, players } = data;
      localStorage.setItem("room", JSON.stringify(room));
      localStorage.setItem("players", JSON.stringify(players));

      return { room, players };
    } catch (error) {
      console.error("Error fetching room from server:", error);
      return null;
    }
  };

  const subscribeToWebSockets = useCallback((id: string) => {
    const socket = new SockJS("http://localhost:8083/ws");
    const formattedId = id.toString().replaceAll("0", "");
    const destination = `/topic/rooms/${formattedId}/game`;

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe(destination, (message) => {
          try {
            // Attempt to parse the message body as JSON
            const parsedMessage = JSON.parse(message.body);
            console.log("Game message:", parsedMessage);
          } catch (e) {
            // If it's not JSON, handle non-JSON messages (e.g., "Game started")
            console.log("Non-JSON message received:", message.body);
            if (message.body === "Game started") {
              // Handle the 'Game started' scenario here
              console.log("Game has started.");
            }
          }
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket Error:", frame.headers["message"]);
      },
    });

    client.activate();
    setStompClient(client);
  }, []);

  const handleStartGame = () => {
    if (!stompClient || !stompClient.connected || !room) return;

    stompClient.publish({
      destination: `/app/start/${room.id}`,
      body: JSON.stringify({ roomId: room.id, action: "start" }), // Example payload
    });

    // Optionally, trigger the question sending as well
    stompClient.publish({
      destination: `/app/game/${room.id}/${room.hostId}`,
      body: JSON.stringify({ action: "initiate" }), // Example payload
    });
    router.push("/quiz/multiplayer/question");
  };

  useEffect(() => {
    const initLobby = async () => {
      let roomData = parseLocalStorage("room");
      let playersData: Player[] = parseLocalStorage("players");
      const fallbackRoomId = parseLocalStorage("roomId");

      if (!roomData && fallbackRoomId) {
        const fresh = await fetchRoomFromServer(fallbackRoomId);
        if (!fresh) return;
        roomData = fresh.room;
        playersData = fresh.players;
      }

      if (!roomData || !roomData.id) return;

      const formattedId = roomData.id.toString().padStart(6, "0");
      setRoomId(formattedId);
      setRoom(roomData);

      const allPicsPresent =
        playersData?.length &&
        playersData.every((p) => p.profilePicUrl?.trim());

      const finalPlayers = allPicsPresent
        ? playersData
        : await enrichPlayers(playersData || []);

      setPlayers(finalPlayers);
      localStorage.setItem("players", JSON.stringify(finalPlayers));

      subscribeToWebSockets(formattedId);
    };

    const uid = localStorage.getItem("userId");
    const uname = localStorage.getItem("username");
    if (uid) setUserId(uid);
    if (uname) setUsername(uname);

    initLobby();
  }, [subscribeToWebSockets]);

  const padded = useCallback(
    (n?: number) => (n !== undefined ? n.toString().padStart(2, "0") : "00"),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white font-[Piedra]">
      <h1 className="text-4xl font-bold mb-6">{room?.name}</h1>
      <div className="mb-4 text-xl">Room Code: {roomId}</div>

      <div className="flex gap-8">
        {/* Player List */}
        <div className="bg-[#1e1e1e] px-10 py-8 rounded-3xl shadow-lg w-[400px] flex flex-col  items-center gap-6 tracking-widest">
          <div className="text-2xl font-bold flex items-center justify-center flex-col  w-full">
            <div>Waiting Lobby</div>
            <div className="text-sm w-full text-right">{`${padded(
              players.length
            )}/${padded(room?.maxPlayers)}`}</div>
            <div className="text-lg ">Player's</div>
          </div>

          <div className="w-full flex flex-col gap-4 p-6 rounded-3xl overflow-y-auto bg-[#111111] h-57 max-h-[70vh] overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent">
            <style jsx>{`
              /* Custom scrollbar styling for Webkit-based browsers */
              ::-webkit-scrollbar {
                width: 8px;
              }
              ::-webkit-scrollbar-track {
                background: transparent;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #4b4b4b;
                border-radius: 9999px;
                border: 2px solid transparent; /* Optional: adds border around thumb */
                background-clip: content-box; /* Ensures the thumb color does not bleed outside */
              }
              ::-webkit-scrollbar-thumb:hover {
                background-color: #6c6c6c; /* Change color on hover */
              }
              ::-webkit-scrollbar-thumb:active {
                background-color: #8c8c8c; /* Change color on active */
              }
            `}</style>

            {players.map((player, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-4 py-2 rounded-3xl transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow:
                    "0 0 10px 2px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)",
                  backgroundColor: "#1c1c1c",
                }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                  <Image
                    src={
                      player.profilePicUrl
                        ? player.profilePicUrl
                        : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                    }
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-lg">{player.name}</div>
              </div>
            ))}
          </div>

          <PokeButton buttonName="Start" onClick={handleStartGame} />
        </div>

        {/* Chat Toggle and Box */}
        <div className="relative">
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className={`absolute top-2  w-12 h-12 bg-[#1e1e1e] hover:bg-[#2a2a2a] p-3 rounded-full shadow-lg transition-all duration-300 ${
              showChat ? "left-104" : ""
            }`}
            style={{ boxShadow: "0 0 10px rgba(255,255,255,0.3)" }}
          >
            <MessagesSquare className="text-white w-6 h-6" />
          </button>

          {showChat && (
            <div
              className="animate-slide-in-right w-[400px]"
              style={{ animationDuration: "0.4s" }}
            >
              <ChatComponent stompClient={stompClient} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;

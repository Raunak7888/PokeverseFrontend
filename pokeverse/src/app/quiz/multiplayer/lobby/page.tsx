"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import PokeButton from "@/components/PokemonButton";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ChatComponent from "@/components/chatcomponent";
import { MessagesSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
    } catch (e) {
      console.error(`Error parsing localStorage item "${key}":`, e);
      return null;
    }
  };

  const parseUserCookie = () => {
    try {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const jsonMatch = userCookie.match(/\{.*\}/);
        if (jsonMatch && jsonMatch[0]) {
          const decodedJsonString = decodeURIComponent(jsonMatch[0]);
          const userData = JSON.parse(decodedJsonString);
          console.log("Parsed user data from cookie:", userData);
          return {
            id: userData.id.toString(),
            name: userData.name,
            profilePicUrl: userData.profilePicUrl || "",
          };
        }
      }
    } catch (e) {
      console.error("Error parsing user cookie:", e);
    }
    return null;
  };


  const normalizePlayers = (playersFromServer: any[]): Player[] => {
    return playersFromServer.map((p) => ({
      userId: p.userId.toString(),
      name: p.name,
      profilePicUrl: p.profilePicUrl || "",
    }));
  };

  const enrichPlayers = async (playerList: Player[]): Promise<Player[]> => {
    return Promise.all(
      playerList.map(async (player) => {
        if (player.profilePicUrl?.trim()) return player;

        try {
          const res = await fetch(
            `http://localhost:8082/auth/user/profile/pic/${player.userId}`
          );
          if (!res.ok) {
              console.warn(`Failed to fetch pic for ${player.name}: Status ${res.status}`);
              return { ...player, profilePicUrl: "" };
          }
          const data = await res.json();
          return {
            ...player,
            profilePicUrl: data?.profilePicUrl?.trim() || "",
          };
        } catch (e) {
          console.error(`Failed to fetch pic for ${player.name}:`, e);
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

      const normalizedPlayers = normalizePlayers(players || []);

      localStorage.setItem("room", JSON.stringify(room));
      localStorage.setItem("players", JSON.stringify(normalizedPlayers));
      localStorage.setItem("roomId", room.id.toString());

      return { room, players: normalizedPlayers };
    } catch (error) {
      console.error("Error fetching room from server:", error);
      return null;
    }
  };

  const subscribeToWebSockets = useCallback(
    (id: string) => {
      console.log("Attempting to connect to WebSocket...");
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
              const parsedMessage = JSON.parse(message.body);
              console.log("Game message:", parsedMessage);

              // --- MODIFICATION STARTS HERE ---
              if (parsedMessage?.userId && parsedMessage?.name) {
                // The new player data is directly in parsedMessage, not parsedMessage.player
                const newPlayer: Player = {
                    userId: parsedMessage.userId.toString(), // Access userId directly
                    name: parsedMessage.name,               // Access name directly
                    profilePicUrl: parsedMessage.profilePicUrl || "", // Add profilePicUrl if it exists in the message, or default
                };
                
                setPlayers((currentPlayers) => {
                  const isDuplicate = currentPlayers.some(
                    (player) => player.userId === newPlayer.userId
                  );
                  if (!isDuplicate) {
                    const updatedPlayers = [...currentPlayers, newPlayer];
                    localStorage.setItem(
                      "players",
                      JSON.stringify(updatedPlayers)
                    );
                    console.log("Added new player:", newPlayer.name);
                    return updatedPlayers;
                  }
                  console.log("Player already exists:", newPlayer.name);
                  return currentPlayers;
                });
              } else if (parsedMessage && parsedMessage.type === "GAME_STARTED") {
                console.log("Game has started.");
                router.push(`/quiz/multiplayer/question`);
              }
              // --- MODIFICATION ENDS HERE ---
            } catch (e) {
              console.error("Error parsing WebSocket message or handling it:", e);
              if (message.body === "Game started") {
                console.log("Game has started.");
                router.push(`/quiz/multiplayer/question`);
              }
            }
          });
        },
        onStompError: (frame) => {
          console.error("WebSocket Error:", frame.headers["message"]);
          console.error("STOMP Frame:", frame);
        },
        onDisconnect: (frame) => {
            console.log("Disconnected from WebSocket", frame);
        }
      });

      client.activate();
      setStompClient(client);

      return () => {
        if (client.connected) {
          client.deactivate();
          console.log("WebSocket client deactivated on unmount.");
        }
      };
    },
    [router]
  );

  useEffect(() => {
    console.log("First useEffect: Loading initial data...");

    const user = parseUserCookie();
    if (user) {
      setUserId(user.id);
      setUsername(user.name);
      console.log("Loaded userId from cookie:", user.id);
      console.log("Loaded username from cookie:", user.name);
    } else {
      console.warn("User cookie not found or could not be parsed.");
    }

    const rooming = localStorage.getItem("room");
    const playerslocal = localStorage.getItem("players");
    if (rooming) {
      setRoom(JSON.parse(rooming));
      console.log("Loaded room from localStorage:", JSON.parse(rooming));
    }
    if (playerslocal) {
      setPlayers(JSON.parse(playerslocal));
      console.log("Loaded players from localStorage:", JSON.parse(playerslocal));
    }
    const idOfRoom = localStorage.getItem("roomId");
    if (idOfRoom) {
      setRoomId(idOfRoom.toString().padStart(6, "0"));
      console.log("Loaded roomId from localStorage:", idOfRoom);
    }
  }, []);

  useEffect(() => {
    console.log("Second useEffect triggered. Current userId:", userId);
    if (!userId) {
      console.log("userId is not set yet. Skipping initLobby.");
      return;
    }

    const initLobby = async () => {
      console.log("initLobby started with userId:", userId);
      let roomData = parseLocalStorage("room");
      let playersData: Player[] = parseLocalStorage("players");
      const fallbackRoomId = parseLocalStorage("roomId");

      if (!roomData && fallbackRoomId) {
        console.log("No room data in state, fetching from server with roomId:", fallbackRoomId);
        const fresh = await fetchRoomFromServer(fallbackRoomId);
        if (!fresh) {
          console.error("Failed to fetch room from server.");
          return;
        }
        roomData = fresh.room;
        playersData = fresh.players;
      }

      if (!roomData || !roomData.id) {
        console.warn("No room data or room ID available after attempts. Cannot proceed with lobby initialization.");
        return;
      }

      const formattedId = roomData.id.toString().padStart(6, "0");
      setRoomId(formattedId);
      setRoom(roomData);
      setPlayers(playersData || []);
      localStorage.setItem("players", JSON.stringify(playersData || []));

      console.log("Calling subscribeToWebSockets with ID:", formattedId);
      subscribeToWebSockets(formattedId);

      console.log("Proceeding to enrich player data...");
      const allPicsPresent =
        playersData?.length &&
        playersData.every((p) => p.profilePicUrl?.trim());

      if (!allPicsPresent && playersData) {
        try {
          const enriched = await enrichPlayers(playersData);
          setPlayers(enriched);
          localStorage.setItem("players", JSON.stringify(enriched));
        } catch (e) {
          console.error("Error enriching players after WebSocket connection:", e);
        }
      }
    };

    initLobby();
  }, [userId, subscribeToWebSockets]);

  const handleStartGame = () => {
    if (!stompClient || !stompClient.connected || !room) {
      console.warn("Cannot start game: STOMP client not connected or room not available.");
      return;
    }

    console.log(`Sending start game message to /app/start/${room.id}`);
    stompClient.publish({
      destination: `/app/start/${room.id}`,
      body: JSON.stringify({ roomId: room.id, action: "start" }),
    });

    setTimeout(() => {
      console.log(`Sending initiate game message to /app/game/${room.id}/${room.hostId}`);
      stompClient.publish({
        destination: `/app/game/${room.id}/${room.hostId}`,
        body: JSON.stringify({ action: "initiate" }),
      });
    }, 300);
  };

  const padded = useCallback(
    (n?: number) => (n !== undefined ? n.toString().padStart(2, "0") : "00"),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white font-[Piedra]">
      <h1 className="text-4xl font-bold mb-6">{room?.name}</h1>
      <div className="mb-4 text-xl">Room Code: {roomId}</div>

      <div className="flex gap-8">
        <div className="bg-[#1e1e1e] px-10 py-8 rounded-3xl shadow-lg w-[400px] flex flex-col  items-center gap-6 tracking-widest">
          <div className="text-2xl font-bold flex items-center justify-center flex-col  w-full">
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

        <div className="relative">
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className={`absolute top-2  w-12 h-12 bg-[#1e1e1e] hover:bg-[#2a2a2a] p-3 rounded-full shadow-lg transition-all duration-300 ${
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
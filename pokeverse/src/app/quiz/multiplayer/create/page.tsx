"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import PikachuLoader from "@/components/pikachuLoader";
import PokeButton from "@/components/PokemonButton";

const Create = () => {
  const router = useRouter();

  const [playerCount, setPlayerCount] = useState(2);
  const [rounds, setRounds] = useState(5);
  const [roomName, setRoomName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie));
        setUserId(user.id);
        setUserName(user.name);
      } catch (err) {
        console.error("Invalid user cookie:", err);
      }
    }
  }, []);

  const handlePlayerCountChange = (delta: number) => {
    setPlayerCount((prev) => Math.min(10, Math.max(2, prev + delta)));
  };

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleCreate = async () => {
    if (!roomName || userId === null || !userName) {
      showModal("Please enter a room name and ensure you're logged in.");
      return;
    }

    setIsLoading(true);
    try {
      const createRes = await fetch("http://localhost:8083/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          hostId: userId,
          maxPlayers: playerCount,
          maxRound: rounds,
        }),
      });

      const roomData = await createRes.json();
      if (!createRes.ok)
        throw new Error(roomData.message || "Failed to create room");

      localStorage.setItem("room", JSON.stringify(roomData));

      const joinRes = await fetch(
        `http://localhost:8083/api/rooms/join?roomId=${roomData.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, name: userName }),
        }
      );

      const joinResult = await joinRes.text();
      if (!joinRes.ok) {
        showModal("Room created, but failed to join: " + joinResult);
        return;
      }

      router.push("/quiz/multiplayer/lobby");
    } catch (err: any) {
      console.error("Create/join error:", err);
      showModal(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white font-[Piedra] tracking-widest">
      <h1 className="text-4xl font-bold mb-10">Create Room</h1>
      {isLoading && <PikachuLoader />}

      <div className="bg-[#1e1e1e] p-10 rounded-3xl shadow-xl w-[500px] flex flex-col gap-6 items-center">
        {/* Room Name */}
        <InputRow label="Name">
          <input
            type="text"
            placeholder="Name of the Room"
            className={inputClass}
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </InputRow>

        {/* Player Count */}
        <InputRow label="Players">
          <div className="flex items-center gap-2">
            <StepperButton
              onClick={() => handlePlayerCountChange(-1)}
              type="minus"
            />
            <span className="text-white text-sm w-10 text-center">
              {playerCount}
            </span>
            <StepperButton
              onClick={() => handlePlayerCountChange(1)}
              type="plus"
            />
          </div>
        </InputRow>

        {/* Rounds Dropdown */}
        <InputRow label="Rounds">
          <select
            className={`${inputClass} w-[300px]`}
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </InputRow>

        <div onClick={handleCreate}>
          <PokeButton buttonName="Create" />
        </div>
      </div>

      <Modal
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// Reusable Subcomponents & Constants
const inputClass =
  "relative left-[20px] w-full px-4 py-2 rounded-full bg-[#2e2e2e] placeholder-gray-400 text-white outline-none";

const InputRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="w-full flex items-center">
    <div className="text-xl w-[100px]">{label}</div>
    {children}
  </div>
);

const StepperButton = ({
  onClick,
  type,
}: {
  onClick: () => void;
  type: "plus" | "minus";
}) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 rounded-md h-6 w-6 flex items-center justify-center focus:ring-2 focus:outline-none"
  >
    {type === "minus" ? (
      <svg className="w-3 h-3 text-gray-900 dark:text-white" viewBox="0 0 18 2">
        <path
          d="M1 1h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        className="w-3 h-3 text-gray-900 dark:text-white"
        viewBox="0 0 18 18"
      >
        <path
          d="M9 1v16M1 9h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )}
  </button>
);

export default Create;

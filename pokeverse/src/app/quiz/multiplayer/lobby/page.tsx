"use client";

import React from "react";
import Image from "next/image";
import PokeButton from "@/components/PokemonButton";

const players = ["Player 1", "Player 2", "Player 3"];

const Lobby = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white font-[Piedra]">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">Waiting Lobby</h1>

      {/* Card Container */}
      <div className="bg-[#1e1e1e] px-10 py-8 rounded-3xl shadow-lg w-[400px] flex flex-col items-center gap-6">
        {/* Player Count */}
        <div className="text-2xl font-bold flex items-center justify-center w-full">
          <span className="">Players</span>
          <span className="text-sm relative left-[15vh]">0{players.length}/06</span>
        </div>

        {/* Player List */}
        <div className="w-full flex flex-col gap-4 p-6 rounded-3xl bg-[#111111]">
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
              {/* Circle with Pokeball */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                <Image
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="Pokeball"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>

              {/* Player Name */}
              <div className="flex-1 text-lg">{player}</div>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <PokeButton buttonName="Start" />
      </div>
    </div>
  );
};

export default Lobby;

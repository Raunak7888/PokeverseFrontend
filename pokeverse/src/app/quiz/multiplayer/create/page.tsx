"use client";

import PokeButton from "@/components/PokemonButton";
import React, { useState } from "react";

const Create = () => {
  const inputcss: string =
    "relative left-[20px] w-full px-4 py-2 rounded-full bg-[#2e2e2e] placeholder-gray-400 text-white outline-none";
  const inputdivcss: string = "text-xl block w-[100px]";

  const [playerCount, setPlayerCount] = useState(2); // default to 2 players

  const handlePlayerCountChange = (change: number) => {
    setPlayerCount((prev) => {
      const newVal = prev + change;
      return Math.min(10, Math.max(2, newVal)); // clamp between 2 and 10
    });
  };

  const [rounds, setRounds] = useState<number>(5);

  return (
    <div className="flex items-center justify-center flex-col h-[100%] text-white font-[Piedra] tracking-widest">
      <h1 className="text-4xl font-bold mb-10">Create Room</h1>

      <div className="bg-[#1e1e1e] p-10 rounded-3xl shadow-xl w-[500px] flex flex-col gap-6 items-center">
        {/* Name Input */}
        <div className="w-full flex flex-row items-center">
          <div className={inputdivcss}>Name</div>
          <input
            type="text"
            placeholder="Name of the Room"
            className={inputcss}
          />
        </div>

        {/* Players Input */}
        <div className="w-full flex flex-row items-center">
          <div className={inputdivcss}>Players</div>
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePlayerCountChange(-1)}
              className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-6 w-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              className="shrink-0 text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
              value={playerCount}
              readOnly
            />
            <button
              type="button"
              onClick={() => handlePlayerCountChange(1)}
              className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-6 w-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Rounds Select */}
        <div className="w-full flex flex-row items-center">
          <div className={inputdivcss}>Rounds</div>
          <div className={inputcss}>
            <select
              className="relative   rounded-full bg-[#2e2e2e] placeholder-gray-400 text-white outline-none w-[300px]"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Create Button */}
        <PokeButton buttonName={"Create"} />
      </div>
    </div>
  );
};

export default Create;

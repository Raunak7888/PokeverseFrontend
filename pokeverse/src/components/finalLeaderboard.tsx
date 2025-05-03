"use client";

import PokeButton from "@/components/PokemonButton";
import React from "react";

const players = [
  { name: "Player 1", correct: 9, incorrect: 0, unanswered: 1 },
  { name: "Player 2", correct: 7, incorrect: 1, unanswered: 2 },
  { name: "Player 3", correct: 6, incorrect: 2, unanswered: 2 },
  { name: "Player 4", correct: 6, incorrect: 2, unanswered: 2 },
  { name: "Player 5", correct: 5, incorrect: 3, unanswered: 2 },
  { name: "Player 6", correct: 4, incorrect: 4, unanswered: 2 },
  { name: "Player 7", correct: 3, incorrect: 4, unanswered: 3 },
];

const calculateAccuracy = (
  correct: number,
  incorrect: number,
  unanswered: number
) => {
  const total = correct + incorrect + unanswered;
  const numerator = correct * 3 + unanswered * 0 + incorrect * -1;
  const denominator = total * 3;
  const accuracy = (numerator / denominator) * 100;
  return `${accuracy.toFixed(2)}%`;
};

const LeaderBoard = () => {
  return (
    <div className="bg-black  flex items-center justify-center px-4 py-10 font-[mogra]">
      <div className="w-full max-w-6xl bg-[#1f1f1f] text-white rounded-3xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold tracking-wide font-[Piedra]">
            <span className="text-[#FF3B3B]">#</span>
            <span className="underline decoration-[#FF3B3B]">01/08</span>
          </h1>
        </div>

        {/* Title */}
        <div className="text-center text-3xl font-bold mb-4">Leader Board</div>

        {/* Table Headers */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 font-semibold text-sm text-center mb-2">
          {[
            "Rank",
            "Player",
            "Correct",
            "Incorrect",
            "Unanswered",
            "Accuracy",
          ].map((title) => (
            <div
              key={title}
              className="bg-[#333] p-2 rounded-md uppercase tracking-wider"
            >
              {title}
            </div>
          ))}
        </div>

        {/* Player Rows */}
        {players.map((player, index) => {
          const isTop3 = index < 3;
          const rankColors = ["bg-[#FFD700]", "bg-[#C0C0C0]", "bg-[#CD7F32]"];
          const rowColor = isTop3
            ? `${rankColors[index]} text-black font-semibold`
            : "bg-[#2a2a2a] text-white";

          return (
            <div
              key={player.name}
              className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-sm mb-2"
            >
              <div className={`p-2 rounded-md ${rowColor}`}>#{index + 1}</div>
              <div className={`p-2 rounded-md ${rowColor}`}>{player.name}</div>
              <div className={`p-2 rounded-md ${rowColor}`}>
                {player.correct}
              </div>
              <div className={`p-2 rounded-md ${rowColor}`}>
                {player.incorrect}
              </div>
              <div className={`p-2 rounded-md ${rowColor}`}>
                {player.unanswered}
              </div>
              <div className={`p-2 rounded-md ${rowColor}`}>
                {calculateAccuracy(
                  player.correct,
                  player.incorrect,
                  player.unanswered
                )}
              </div>
            </div>
          );
        })}

        {/* Button */}
        <div className="flex justify-center mt-8">
          <PokeButton buttonName="Menu" />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

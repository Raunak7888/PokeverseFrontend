"use client";

import React, { useState } from "react";
import PokeButton from "@/components/PokemonButton";
import LeaderBoard from "@/components/finalLeaderboard";

const Result = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  if (showLeaderboard) {
    return <LeaderBoard />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="bg-[#1e1e1e] text-white rounded-3xl p-8 w-[71vw] h-[66vh] shadow-2xl font-[Piedra] tracking-widest">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold tracking-wide font-[Piedra]">
            <span className="text-[#FF3B3B]">#</span>
            <span className="underline decoration-[#FF3B3B]">01/08</span>
          </h1>
        </div>

        <div className="flex justify-center items-center flex-col text-center">
          <h2 className="text-7xl font-extrabold underline underline-offset-7 mb-10">
            Well Done !!!
          </h2>
          <p className="text-5xl font-bold underline underline-offset-7 mb-10">
            You Have Completed the Quiz!!!
          </p>
          <p className="text-lg">
            You Scored <span className="font-bold">6 out of 10</span>
          </p>

          <div className="flex justify-center gap-6 mt-10">
            <PokeButton
              buttonName="Leaderboard"
              onClick={() => setShowLeaderboard(true)}
            />
            <PokeButton buttonName="Menu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

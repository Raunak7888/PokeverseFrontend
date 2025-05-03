import React from "react";

const players = [
  { id: 1, name: "Player 1", question: 1, score: 0 },
  { id: 2, name: "Player 2", question: 1, score: 0 },
  { id: 3, name: "Player 3", question: 1, score: 0 },
  { id: 4, name: "Player 4", question: 1, score: 0 },
  { id: 5, name: "Player 5", question: 1, score: 0 },
  { id: 6, name: "Player 6", question: 1, score: 0 },
  { id: 7, name: "Player 7", question: 1, score: 0 },
];

const rankColors = ["text-[#FFD700]", "text-[#C0C0C0]", "text-[#CD7F32]"];

export default function LeaderBoard2() {
  return (
    <div className="leaderboard-scroll font-[Piedra] tracking-widest bg-[#1e1e1e] rounded-l-[2.5rem] p-4 max-h-[calc(100vh-7rem)] overflow-y-auto relative bottom-8 w-full sm:w-72 md:w-80 lg:w-96 xl:w-[28rem]">
      {players.map((player, index) => (
        <div key={player.id} className="flex items-center mb-3">
          {/* Rank number */}
          <div
            className={`text-xl md:text-2xl font-bold w-10 md:w-12 text-center ${
              rankColors[index] || "text-white"
            }`}
          >
            #{index + 1}
          </div>

          {/* Player profile */}
          <div className="flex items-center  bg-[#2e2e2e] p-2 rounded-[2.5rem] shadow-inner flex-grow overflow-hidden">
            <div className="flex items-center bg-[#3c3c3c] p-2 rounded-[2.5rem] shadow-inner flex-grow overflow-hidden">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[50%] bg-[#d9d9d9] mx-2 shrink-0"></div>
              <div className="bg-[#595959] rounded-r-[2.5rem] shadow-inner px-2 py-1 w-full overflow-hidden">
                <div className="text-white text-xs md:text-sm leading-snug truncate">
                  <div className="font-bold truncate">{player.name}</div>
                  <div className="text-[10px] md:text-xs text-gray-300 tracking-wide truncate">
                    Question {player.question} Out of 10
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-300 truncate">
                    Score : {player.score}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import { useClock } from "@/components/GameClockContext";

const MultiplayerResult = ({ duration }: { duration: number }) => {
  const { elapsed } = useClock();
  const remaining = Math.max(0, duration - elapsed);
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (remaining / duration) * circumference;

  return (
    <div className="bg-[#1e1e1e] flex items-center ml-9 justify-center flex-col text-white rounded-3xl p-8 w-[71vw] h-[66vh] shadow-2xl font-[Piedra] tracking-widest">
      <div className="text-7xl font-extrabold text-[#2CC30A] mb-6 text-left">
        Correct Answer !!!
      </div>
      <div className="text-6xl font-extrabold text-[#2CC30A] mb-6 text-left">
        Well Done !!!
      </div>
      <div className="text-xl font-extrabold text-white mb-6 text-left">
        Waiting For Other Players to Finish...
      </div>

      {/* Time until next round */}
      <div className="flex flex-row items-center justify-center gap-6 mt-8">
        <div className="text-2xl font-bold text-white">
          Next round begins in:
        </div>

        {/* Circular Countdown Clock */}
        <div className="relative w-[100px] h-[100px]">
          <svg width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#444"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#2CC30A"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl text-[#2CC30A]">
            {remaining.toFixed(0)}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerResult;

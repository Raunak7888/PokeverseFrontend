"use client";
import React from "react";

interface PokeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

export default function PokeButton({ buttonName, ...rest }: PokeButtonProps) {
  return (
    <button className="flex justify-center items-center gap-0 w-full" {...rest}>
      <div className="flex justify-center items-center gap-0 flex-col m-0 p-0 border-0">
        <div className="h-[20px] sm:h-[24px] w-[180px] sm:w-[200px] rounded-t-4xl flex border-black border-2 justify-center items-center bg-[#EE4035] text-white font-extrabold font-[Piedra]"></div>
        <div className="bg-[#1e1e1e] h-[10px] sm:h-[14px] w-[180px] sm:w-[200px] text-white z-50 flex justify-center items-center font-extrabold font-[Piedra]">
          <div
            className="text-2xl sm:text-3xl z-40 tracking-widest"
            style={{
              textShadow: `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`,
              color: "white",
            }}
          >
            {buttonName}
          </div>
        </div>
        <div className="bg-white h-[20px] sm:h-[24px] w-[180px] sm:w-[200px] rounded-b-4xl flex border-black border-2 justify-center items-center text-white font-extrabold font-[Piedra]"></div>
      </div>
    </button>
  );
}

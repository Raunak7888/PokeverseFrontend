import React from "react";
import PokeButton from "./PokemonButton";

export interface ResultProps {
  isCorrect: boolean;
}

const Result: React.FC<ResultProps> = ({ isCorrect }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-4 rounded-[5vh] shadow-lg">
      <div className="flex flex-col items-center space-y-4 w-[70vw] bg-[#1e1e1e] p-6 rounded-[5vh] shadow-lg">
        <div className="text-[#2CC30A] text-7xl font-[Piedra] tracking-widest mt-14">
          Correct Answer!!!
        </div>
        <div className="text-[#2CC30A] text-7xl font-[Piedra] tracking-widest">
          Well Done!!!
        </div>
        <div className="mt-14">
          <PokeButton buttonName="Next" />
        </div>
      </div>
    </div>
  );
};

export default Result;

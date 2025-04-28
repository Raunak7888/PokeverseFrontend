import PokeButton from "@/components/PokemonButton";
import React from "react";

const CompletedResult = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-4 min-h-screen shadow-lg">
      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl bg-[#423] p-6 md:p-10 rounded-[5vh] shadow-lg">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl underline font-[Piedra] tracking-widest mt-10 md:mt-14 text-center">
          Hey you Completed the Quiz
        </div>
        <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl underline font-[Piedra] tracking-widest text-center">
          Well Done!!!
        </div>
        <div className="text-white text-lg sm:text-xl md:text-2xl font-[Piedra] tracking-widest text-center">
          You Scored 5 out of 10
        </div>
        <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center justify-center gap-6">
          <PokeButton buttonName="Anaylsis" />
          <PokeButton buttonName="Home" />
        </div>
      </div>
    </div>
  );
};

export default CompletedResult;

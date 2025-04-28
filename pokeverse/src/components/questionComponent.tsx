"use client";

import Pokeball from "@/components/pokeball";
import OptionButton from "@/components/optionButton";
import React, { useState } from "react";
import PokeButton from "@/components/PokemonButton";

interface QuestionComponentProps {
  questionNumber: number;
  questionText: string;
  optionsText: { A: string; B: string; C: string; D: string };
  onNext?: () => void;
  onSelect: (option: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionNumber,
  questionText,
  optionsText,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-4 rounded-[5vh] shadow-lg">
      {/* Top: Pokeball + Question */}
      <div className="flex flex-col items-center space-y-4 w-[70vw] bg-[#1e1e1e] p-6 rounded-[5vh] shadow-lg">
        {/* Pokeball */}
        <div className="flex items-center justify-left gap-8 rounded-l-full rounded-r-full  bg-[#3C3C3C] p-4 w-full">
          <div className="relative left-[0.7vw] top-[0.7vh]">
            <Pokeball
              Text={String(questionNumber)}
              size={100}
              css="right-[1.7rem] bottom-[-1.3rem]"
            />
          </div>

          {/* Question Text */}
          <div className="bg-[#575757] px-6 py-4 p-5 relative right-[6px] rounded-l-full rounded-r-full text-lg font-semibold">
            {questionText}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mt-8 w-full rounded-l-full rounded-r-full">
          <OptionButton
            optionKey="A"
            text={optionsText.A}
            imageSrc="/croped-pikachu.png"
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
          <OptionButton
            optionKey="B"
            text={optionsText.B}
            imageSrc="/croped-charmander.png"
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
          <OptionButton
            optionKey="C"
            text={optionsText.C}
            imageSrc="/croped-squirtle.png"
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
          <OptionButton
            optionKey="D"
            text={optionsText.D}
            imageSrc="/croped-bulbasaur.png"
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
        </div>
        <div className="mt-8">
          <PokeButton buttonName="Submit" />
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;

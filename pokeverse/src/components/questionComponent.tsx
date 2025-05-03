import React, { useState } from "react";
import { useClock } from "@/components/GameClockContext";

import Pokeball from "@/components/pokeball";
import OptionButton from "@/components/optionButton";
import PokeButton from "@/components/PokemonButton";

const QuestionComponent = ({
  questionNumber,
  questionText,
  optionsText,
  onSelect,
  onSubmit, // ✅ NEW
  duration,
}: any) => {
  const { elapsed } = useClock();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const remaining = Math.max(0, duration - elapsed);
  const percentage = (remaining / duration) * 100;

  const getClockColor = () => {
    if (percentage > 66) return "#ffffff";
    if (percentage > 33) return "#dddddd";
    return "#aaaaaa";
  };

  const handleOptionClick = (option: string) => {
    const newSelection = selectedOption === option ? null : option;
    setSelectedOption(newSelection);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSelect(selectedOption); 
      onSubmit?.(); // ✅ Call parent only if something is selected
    }
  };

  return (
    <div className="relative flex items-center ml-9 justify-center p-[5px]">
      <div
        className="rounded-[5vh] w-[71vw] h-[66vh] flex items-center justify-center bg-[#1e1e1e]"
        style={{
          background: `conic-gradient(${getClockColor()} ${percentage}%, transparent ${percentage}%)`,
        }}
      >
        <div className="bg-black rounded-[5vh]">
          <div className="relative z-10 flex flex-col items-center justify-center bg-black text-white rounded-[5vh] shadow-lg w-[80vw] sm:w-[70vw] overflow-hidden">
            <div className="flex flex-col items-center space-y-4 bg-[#1e1e1e] p-6 rounded-[5vh] shadow-lg w-full">
              <div className="flex items-center justify-center sm:justify-start gap-8 bg-[#3C3C3C] p-4 w-full rounded-full">
                <div className="relative sm:left-[0.7vw] sm:top-[0.7vh]">
                  <Pokeball
                    Text={String(questionNumber)}
                    size={100}
                    css="sm:right-[1.7rem] sm:bottom-[-1.3rem]"
                  />
                </div>
                <div className="bg-[#575757] px-6 py-4 sm:p-5 rounded-full text-lg sm:text-xl font-semibold">
                  {questionText}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                {(["A", "B", "C", "D"] as const).map((key) => (
                  <OptionButton
                    key={key}
                    optionKey={key}
                    text={optionsText[key]}
                    imageSrc={
                      key === "A"
                        ? "/croped-pikachu.png"
                        : key === "B"
                        ? "/croped-charmander.png"
                        : key === "C"
                        ? "/croped-squirtle.png"
                        : "/croped-bulbasaur.png"
                    }
                    selectedOption={selectedOption}
                    onOptionClick={handleOptionClick}
                  />
                ))}
              </div>

              <PokeButton
                buttonName="Submit"
                onClick={handleSubmit}
                disabled={!selectedOption} // ✅ Disable if no option is selected
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;

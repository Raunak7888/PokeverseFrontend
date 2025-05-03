"use client";
import React from "react";
import Image from "next/image";

interface OptionButtonProps {
  optionKey: string;
  text: string;
  imageSrc?: string;
  selectedOption: string | null;
  onOptionClick: (option: string) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  optionKey,
  text,
  imageSrc,
  selectedOption,
  onOptionClick,
}) => {
  const isSelected = selectedOption === optionKey;

  return (
    <button
      onClick={() => onOptionClick(optionKey)}
      className={`flex items-center space-x-2 bg-[#3c3c3c] px-4 py-3 rounded-full w-full ${
        isSelected ? "ring-7 ring-yellow-400" : ""
      }`}
    >
      {imageSrc ? (
        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
          <Image
            src={imageSrc}
            alt={text}
            fill
            style={{ objectFit: "contain" }}
            sizes="32px"
            priority={false}
          />
        </div>
      ) : (
        <span className="text-2xl">❓</span> // fallback emoji if no imageSrc
      )}
      <div className="flex items-center space-x-2 bg-[#575757] p-3 rounded-full w-full">
        <span className="font-medium">{text}</span>
      </div>
    </button>
  );
};

export default OptionButton;

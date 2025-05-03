"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionComponent from "@/components/questionComponent";
import Result from "@/components/result";
import Pokeball from "@/components/pokeball";

const questionData = {
  questionNumber: 1,
  questionText: "What is your favorite starter Pokémon?",
  optionsText: {
    A: "Pikachu",
    B: "Charmander",
    C: "Squirtle",
    D: "Bulbasaur",
  },
};

const MyPage = () => {
  const [stage, setStage] = useState<"intro" | "question" | "result">("intro");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    setStage("result");
  };

  const handleStart = () => {
    setTimeout(() => {
      setStage("question");
    }, 100); // delay after Pokeball animation
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pokeball Animation */}
      <AnimatePresence>
        {stage === "intro" && (
          <motion.div
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
              duration: 3,
            }}
            className="absolute"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1, x: 0, y: 0, opacity: 0, rotate: -360 }}
              transition={{ delay: 1, duration: 3, ease: "easeInOut" }}
              onAnimationComplete={handleStart}
            >
              <Pokeball Text="1" size={300} css="right-[5rem] bottom-[-4rem]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Animation */}
      <AnimatePresence>
        {stage === "question" && (
          <motion.div
            initial={{ y: -500, opacity: 0, scale: 1.2 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              duration: 0.8,
            }}
            className="z-10"
          >
            <QuestionComponent
              questionNumber={questionData.questionNumber}
              questionText={questionData.questionText}
              optionsText={questionData.optionsText}
              onNext={handleNext}
              onSelect={(option: string) => setSelectedOption(option)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Animation */}
      <AnimatePresence>
        {stage === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Result isCorrect={selectedOption === "B"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyPage;

"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionComponent from "@/components/questionComponent";
import MutiplayerResult from "@/components/mutiplayerResult";
import Pokeball from "@/components/pokeball";
import Leaderboard from "@/components/leaderboard";
import { ClockProvider } from "@/components/GameClockContext";
import { useMultiplayerQuestionStore } from "@/store/multiplayerQuestionStore";

const Question = () => {
  const { multiplayerQuestion } = useMultiplayerQuestionStore();

  const [stage, setStage] = useState<"intro" | "question" | "result">("intro");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startClock, setStartClock] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // To re-trigger animation

  // Duration based on question
  const duration = 30;

  useEffect(() => {
    if (multiplayerQuestion) {
      // Reset stage to intro, then move to question
      setStage("intro");
      setSelectedOption(null);
      setStartClock(false);
      setQuestionKey((prev) => prev + 1); // Change key to trigger re-render
    }
  }, [multiplayerQuestion]);

  const handleStart = () => {
    setTimeout(() => {
      setStage("question");
      setStartClock(true);
    }, 100);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setStage("result");
  };

  const handleSubmit = () => {
    console.log("Submitted:", selectedOption);
    setStage("result");
  };

  return (
    <ClockProvider duration={duration} start={startClock}>
      <div className="min-h-screen bg-black flex items-center justify-between px-4 relative overflow-hidden gap-[1vw]">
        <div className="flex-1 flex justify-center rounded-[40px] items-center relative bottom-8">
          <AnimatePresence>
            {stage === "intro" && (
              <motion.div
                key={`intro-${questionKey}`}
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
                  <Pokeball
                    Text={`${multiplayerQuestion?.questionNumber || "?"}`}
                    size={300}
                    css="left-[9rem] bottom-[-4rem]"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage === "question" && multiplayerQuestion && (
              <motion.div
                key={`question-${questionKey}`}
                initial={{ y: -500, opacity: 0, scale: 1.2 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.2,
                }}
                className="z-10"
              >
                <QuestionComponent
                  questionNumber={multiplayerQuestion.questionNumber}
                  questionText={multiplayerQuestion.question.question}
                  optionsText={{
                    A: multiplayerQuestion.question.options[0],
                    B: multiplayerQuestion.question.options[1],
                    C: multiplayerQuestion.question.options[2],
                    D: multiplayerQuestion.question.options[3],
                  }}
                  onSelect={handleSelect}
                  onSubmit={handleSubmit}
                  selectedOption={selectedOption}
                  duration={duration}
                  isClock={true}
                  isTimebound={true}
                  startClock={startClock}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage === "result" && (
              <motion.div
                key={`result-${questionKey}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <MutiplayerResult duration={duration} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Leaderboard />
      </div>
    </ClockProvider>
  );
};

export default Question;

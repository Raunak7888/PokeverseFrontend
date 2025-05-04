"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionComponent from "@/components/questionComponent";
import Result from "@/components/result";
import Pokeball from "@/components/pokeball";
import { useRouter } from "next/navigation";

const MyPage = () => {
  const [stage, setStage] = useState<"intro" | "question" | "questionResult">(
    "intro"
  );
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const router = useRouter();

  // Load questions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("quizQuestions");
    if (stored) {
      try {
        setQuestions(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid questions JSON:", err);
      }
    }
  }, []);

  // Set start time when stage or question changes
  useEffect(() => {
    if (questions.length > 0 && stage === "question") {
      setStartTime(new Date());
    }
  }, [stage, currentIndex, questions]);

  const handleStart = () => {
    setTimeout(() => {
      setStage("question");
    }, 100);
  };

  const handleAnswerSubmit = async () => {
    if (!selectedOption || !startTime) return;
    console.log("Selected option:", selectedOption);
    const endTime = new Date();
    const currentQuestion = questions[currentIndex];
    const body = {
      sessionId: 1, // Hardcoded session ID for now
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8083/api/attempts/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to submit attempt");

      const data = await res.json();
      const isCorrect = data.correct === true;
      setIsCurrentCorrect(isCorrect);
      if (isCorrect) {
        setCorrectAnswersCount((prev) => prev + 1);
      }
      setStage("questionResult");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

const handleNextQuestion = async () => {
  const isLast = currentIndex + 1 >= questions.length;

  if (isLast) {
    try {
      const sessionStr = localStorage.getItem("session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        const sessionId = session.sessionId;

        // Mark session as COMPLETED
        await fetch(
          `http://localhost:8083/api/session/update/${sessionId}?status=COMPLETED`,
          {
            method: "PUT",
          }
        );
      } else {
        console.warn("Session info not found in localStorage");
      }
    } catch (err) {
      console.error("Failed to mark session as completed:", err);
    }

    router.push(
      `/quiz/singleplayer/result?score=${correctAnswersCount}&total=${questions.length}`
    );
  } else {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setStage("question");
  }
};


  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pokeball Intro Animation */}
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
              <Pokeball
                Text={`${currentIndex + 1}`}
                size={300}
                css="right-[5rem] bottom-[-4rem]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Stage */}
      <AnimatePresence>
        {stage === "question" && currentQuestion && (
          <motion.div
            key={currentIndex}
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
              questionNumber={currentIndex + 1}
              questionText={currentQuestion.question}
              optionsText={{
                A: currentQuestion.optionsList[0],
                B: currentQuestion.optionsList[1],
                C: currentQuestion.optionsList[2],
                D: currentQuestion.optionsList[3],
              }}
              onSubmit={handleAnswerSubmit}
              onSelect={(optionText: string) => setSelectedOption(optionText)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Per-question Result Stage */}
      <AnimatePresence>
        {stage === "questionResult" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.8, 0.25, 1], // smoother cubic easing
            }}
          >
            <Result isCorrect={isCurrentCorrect} onNext={handleNextQuestion} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyPage;

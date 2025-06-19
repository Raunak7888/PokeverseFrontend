import React from 'react';
import { Timer } from 'lucide-react';
import Star from './star';

const analysis = [
    {
        "id": 1,
        "sessionId": 18,
        "userId": 2,
        "quizType": "all",
        "difficulty": "all",
        "region": "all",
        "totalQuestions": 5,
        "correctAnswers": 2,
        "wrongAnswers": 3,
        "accuracy": 100.00,
        "totalDuration": 29125,
        "averageTimePerQuestion": 5825,
        "fastestAnswerTime": 2311,
        "slowestAnswerTime": 2690,
        "answerSpeedRating": "Fast",
        "performanceRating": "Rookie",
        "createdAt": "2025-06-15T23:52:29.457451",
        "questionAnalysis": [
            {
                "questionId": 5,
                "question": "Which Pokémon is known as the 'Genetic Pokémon'?",
                "difficulty": "Hard",
                "region": "Kanto",
                "quizType": "Trivia",
                "selectedAnswer": "Mew",
                "options": [
                    "Mew",
                    "Mewtwo",
                    "Deoxys",
                    "Genesect"
                ],
                "correctAnswer": "Mewtwo",
                "timeTaken": 2429,
                "correct": false
            },
            {
                "questionId": 11,
                "question": "What is the evolved form of Pichu?",
                "difficulty": "Easy",
                "region": "Johto",
                "quizType": "Trivia",
                "selectedAnswer": "Pikachu",
                "options": [
                    "Pikachu",
                    "Raichu",
                    "Electivire",
                    "Jolteon"
                ],
                "correctAnswer": "Pikachu",
                "timeTaken": 2311,
                "correct": true
            },
            {
                "questionId": 8,
                "question": "What is Ash's first Pokémon?",
                "difficulty": "Easy",
                "region": "Kanto",
                "quizType": "Story",
                "selectedAnswer": "Charmander",
                "options": [
                    "Charmander",
                    "Bulbasaur",
                    "Squirtle",
                    "Pikachu"
                ],
                "correctAnswer": "Pikachu",
                "timeTaken": 2690,
                "correct": false
            },
            {
                "questionId": 14,
                "question": "Which Pokémon is the mascot of Pokémon Ruby?",
                "difficulty": "Hard",
                "region": "Hoenn",
                "quizType": "Story",
                "selectedAnswer": "Kyogre",
                "options": [
                    "Kyogre",
                    "Groudon",
                    "Rayquaza",
                    "Latios"
                ],
                "correctAnswer": "Groudon",
                "timeTaken": 2338,
                "correct": false
            },
            {
                "questionId": 18,
                "question": "Which Pokémon is known as the 'New Species Pokémon'?",
                "difficulty": "Medium",
                "region": "Kanto",
                "quizType": "Trivia",
                "selectedAnswer": "Mew",
                "options": [
                    "Mew",
                    "Mewtwo",
                    "Deoxys",
                    "Jirachi"
                ],
                "correctAnswer": "Mew",
                "timeTaken": 2602,
                "correct": true
            }
        ]
    }
];

const Analysis = () => {
    const quizAnalysis = analysis[0];

    const formatTime = (ms: number) => {
        return (ms / 1000).toFixed(2) + ' Sec';
    };

    const accuracyPercentage = 87 + (quizAnalysis.accuracy / 100) * (273 - 87);


    return (
        <div className="flex justify-center items-center h-full w-full text-white">
            <div className="bg-[#202020] h-[90%] w-[90%] rounded-4xl p-7 grid grid-cols-[2fr_8fr] grid-rows-[2fr_4fr] gap-4">

                <div className="flex bg-[#404040] rounded-3xl flex-col items-center
                                transform transition-all duration-300 ease-in-out
                                hover:scale-105 hover:shadow-lg hover:shadow-[#2CC30A]/50 cursor-pointer">
                    <div className="relative rotate-180 w-52 h-32  overflow-hidden">
                        <div
                            className="w-52 h-52 rounded-full absolute bottom-5 left-0 flex items-center justify-center
           transition-transform duration-1000 ease-in-out"
                            style={{
                                background: `conic-gradient(#2CC30A 0deg ${accuracyPercentage}deg, #505050 ${accuracyPercentage}deg 100deg)`
                            }}
                        >
                        </div>
                        {/* This div represents the unfilled background of the ring */}
                        <div className="w-52 h-52 rounded-full absolute -top-25 left-0" style={{ background: '#505050', zIndex: -1 }}></div>


                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#404040] w-36 h-20 rounded-b-full flex flex-col items-center justify-center shadow-inner
                                        transform transition-all duration-300 ease-in-out ">
                            <div className="font-bold text-[10px] rotate-180 font-[Krona_One] tracking-widest">Accuracy</div>
                            <div className="font-bold text-xl rotate-180 font-[Aclonica]">{quizAnalysis.accuracy}%</div>
                        </div>
                    </div>

                    <div className="bg-[#505050] w-full max-w-xs rounded-b-2xl px-6 py-3 flex justify-center space-x-2
                                    transform transition-all duration-300 ease-in-out hover:bg-[#606060]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} fill={i * 20 < quizAnalysis.accuracy} height={40} width={40} />
                        ))}
                    </div>
                </div>

                <div className="bg-[#404040] rounded-3xl p-5 grid grid-rows-2 gap-3">
                    <div className='bg-[#505050] rounded-t-2xl p-2 grid grid-cols-4 gap-3'>
                        <div className='bg-[#606060] rounded-tl-2xl pt-1 pl-3 pr-3
                                        transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                            <div className='font-bold text-xl text-center font-[Aclonica]'>{quizAnalysis.totalQuestions}</div>
                            <div className='w-full text-xs font-[Krona_One] text-center tracking-widest'>Total Question</div>
                        </div>
                        <div className='bg-[#606060] pt-1 pl-3 pr-3
                                        transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                            <div className='font-bold text-xl text-center font-[Aclonica]'>{quizAnalysis.correctAnswers}</div>
                            <div className='w-full text-xs font-[Krona_One] text-center tracking-widest'>Correct Question</div>
                        </div>
                        <div className='bg-[#606060] pt-1 pl-3 pr-3
                                        transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                            <div className='font-bold text-xl text-center font-[Aclonica]'>{quizAnalysis.wrongAnswers}</div>
                            <div className='w-full text-xs font-[Krona_One] text-center tracking-widest'>Wrong Question</div>
                        </div>
                        <div className='bg-[#606060] rounded-tr-2xl pt-1 pl-3 pr-3
                                        transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                            <div className='font-bold text-xl text-center font-[Aclonica]'>{quizAnalysis.totalQuestions - (quizAnalysis.correctAnswers + quizAnalysis.wrongAnswers)}</div>
                            <div className='w-full text-xs font-[Krona_One] text-center tracking-widest'>Unanswered Question</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-[2fr_1fr] gap-3'>
                        <div className='bg-[#505050] rounded-bl-2xl p-2 w-full h-full grid grid-cols-2 gap-3'>
                            <div className='bg-[#606060] rounded-bl-2xl pt-1 pl-3 pr-3
                                            transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                                <div className='font-bold text-xl text-center font-[Aclonica]'>{quizAnalysis.answerSpeedRating}</div>
                                <div className='w-full text-xs font-[Krona_One] text-center tracking-widest'>Speed Rating</div>
                            </div>
                            <div className='bg-[#606060] pt-1 pl-3 pr-3
                                            transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                                <div className='font-bold text-xl text-center font-[Aclonica]'>{quizAnalysis.performanceRating}</div>
                                <div className='w-full text-xs font-[Krona_One] text-center tracking-widest'>Performance Rating</div>
                            </div>
                        </div>
                        <div className='bg-[#505050] rounded-br-2xl p-2 w-full h-full'>
                            <div className='bg-[#606060] rounded-br-2xl w-full h-full pt-1 pl-3 pr-3 pb-1
                                            transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                                <div className='font-bold text-xl text-center font-[Aclonica]'>
                                    {new Date(quizAnalysis.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                                <div className='w-full text-xs font-[Krona_One] tracking-widest text-center'>
                                    Quiz Played Date
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#404040] rounded-3xl p-2">
                    <div className='bg-[#505050] rounded-3xl p-2 grid grid-rows-4 gap-2'>
                        <div className='bg-[#606060] pt-3 pl-3 pr-3 rounded-t-2xl
                                        transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                            <div className='font-bold text-xl font-[Aclonica]'>{formatTime(quizAnalysis.totalDuration)}</div>
                            <div className='w-full text-xs font-[Krona_One] tracking-widest text-end '>Total Duration</div>
                        </div>
                        <div className='bg-[#606060] pt-3 pl-3 pr-3
                                        transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                            <div className='font-bold text-xl font-[Aclonica]'>{formatTime(quizAnalysis.averageTimePerQuestion)}</div>
                            <div className='w-full text-xs font-[Krona_One] tracking-widest text-end '>Average Time Per Question</div>
                        </div>
                        <div className='bg-[#606060] pt-3 pl-3 pr-3 '>
                            <div className='font-bold text-xl font-[Aclonica]'>{formatTime(quizAnalysis.fastestAnswerTime)}</div>
                            <div className='w-full text-xs font-[Krona_One] tracking-widest text-end '>Fastest Time</div>
                        </div>
                        <div className='bg-[#606060] pt-3 pl-3 pr-3 rounded-b-2xl'>
                            <div className='font-bold text-xl font-[Aclonica]'>{formatTime(quizAnalysis.slowestAnswerTime)}</div>
                            <div className='w-full text-xs font-[Krona_One] tracking-widest text-end '>Slowest Time</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#404040] rounded-3xl p-4 h-86 grid grid-rows-[1fr_6fr]">
                    <div className='font-bold text-xl text-center pb-3 font-[Krona_One]'>Question Analysis</div>
                    <div className='bg-[#202020] h-full w-full p-3 rounded-b-2xl overflow-y-scroll custom-scrollbar'>
                        {quizAnalysis.questionAnalysis.map((q, index) => (
                            <div key={q.questionId} className="bg-[#505050] rounded-3xl mb-3 p-3 w-full
                                                            transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg hover:shadow-[#505050]/50 cursor-pointer">
                                <div className='pb-3'>
                                    <span className='font-bold text-lg font-[Outfit]'>Ques {index + 1}. </span><span className='font-bold text-lg font-[Outfit]'>{q.question}</span>
                                </div>
                                <div>
                                    <span className='font-bold text-sm font-[Outfit]'>Ans {index + 1}. </span>
                                    <span className=' font-bold text-sm font-[Outfit]'>
                                        <span className='bg-[#606060] ml-2 rounded-2xl p-1 pl-3 pr-0 group relative'>
                                            Your Answer: {q.selectedAnswer}
                                            <span className={`rounded-2xl ml-2 p-1 pl-2
                                                            ${q.correct ? 'bg-[#2CC30A] shadow-md shadow-[#2CC30A]/40' : 'bg-[#ee4035] shadow-md shadow-[#ee4035]/40'}
                                                            inline-block transform transition-all duration-300 ease-in-out
                                                            group-hover:scale-105 group-hover:shadow-lg
                                                            `}>
                                                {q.correct ? 'Correct' : 'Wrong'}
                                            </span>
                                        </span>
                                        {q.selectedAnswer !== q.correctAnswer && (
                                            <span className='bg-[#606060] ml-2 rounded-2xl p-1 pl-3 pr-2 inline-block transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#707070] cursor-pointer'>
                                                Correct Answer: {q.correctAnswer}
                                            </span>
                                        )}
                                    </span>
                                    <div className="inline-flex items-center justify-center w-full">
                                        <hr className="w-80 h-[3px] mt-5 relative left-14 border-0 bg-[#ededed]" />
                                        <span className="px-3 font-medium mt-7 mb-2 text-xs text-gray-900 -translate-x-1/2 bg-[#505050] relative right-24 dark:text-white font-[Krona_One] ">Time Taken</span>
                                    </div>
                                    <div className='flex items-center mb-1 justify-center flex-row'>
                                        <Timer />
                                        <div className='font-bold ml-1 mt-1 text-lg font-[Outfit]'>{formatTime(q.timeTaken)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
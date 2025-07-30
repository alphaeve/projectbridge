// File: /exam/ExamQuiz.jsx
import React, { useState, useEffect } from "react";

const questions = [
  {
    type: "mcq",
    question: "What is React?",
    options: ["Library", "Framework", "Language"],
    answer: 0,
  },
  {
    type: "mcq",
    question: "What is useState used for?",
    options: ["Styling", "Managing state", "Routing"],
    answer: 1,
  },
  {
    type: "text",
    question: "Explain how React handles re-rendering efficiently.",
  },
  {
    type: "mcq",
    question: "If 3x + 5 = 20, what is x?",
    options: ["3", "5", "15"],
    answer: 0,
  },
  {
    type: "text",
    question: "You are given 8 identical-looking balls. One of them is heavier. You can use a balance scale only twice. How will you find the heavier ball?",
  },
];

const ExamQuiz = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes

  // ⏱ Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMCQ = (i) => {
    if (i === questions[current].answer) setScore((s) => s + 1);
    next();
  };

  const handleText = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    const percentage = (score / questions.filter(q => q.type === "mcq").length) * 100;
    onFinish(percentage, answers); // Pass both score and text answers
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const q = questions[current];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Question {current + 1} / {questions.length}</h2>
        <span className="text-red-600 font-bold">Time Left: {formatTime(timeLeft)}</span>
      </div>
      <p className="mb-3">{q.question}</p>

      {q.type === "mcq" ? (
        <div className="flex flex-col gap-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleMCQ(i)}
              className="bg-blue-100 p-2 rounded hover:bg-blue-300"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Type your answer here..."
            value={answers[current] || ""}
            onChange={handleText}
          />
          <button
            onClick={next}
            className="self-end bg-green-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamQuiz;

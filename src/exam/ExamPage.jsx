// File: /exam/ExamPage.jsx
import React, { useState, useEffect } from "react";
import ExamLogin from "./ExamLogin";
import PayAndStartExam from "./PayAndStartExam";
import ExamQuiz from "./ExamQuiz";
import ExamResult from "./ExamResult";

const ExamPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [examDone, setExamDone] = useState(false);
  const [score, setScore] = useState(null);
  const [textAnswers, setTextAnswers] = useState({});

  useEffect(() => {
    console.log("ExamPage loaded");
    console.log("userLoggedIn:", userLoggedIn);
    console.log("paymentDone:", paymentDone);
    console.log("examDone:", examDone);
    console.log("score:", score);
  }, [userLoggedIn, paymentDone, examDone, score]);

  if (!userLoggedIn)
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">🔐 Step 1: Login</h2>
        <ExamLogin onLogin={() => setUserLoggedIn(true)} />
      </div>
    );

  if (!paymentDone)
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">💳 Step 2: Payment</h2>
        <PayAndStartExam onSuccess={() => setPaymentDone(true)} />
      </div>
    );

  if (!examDone)
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">📝 Step 3: Take Exam</h2>
        <ExamQuiz onFinish={(s, textAnswers) => {
  setScore(s);
  setTextAnswers(textAnswers); // ✅ New state
  setExamDone(true);
}} />

      </div>
    );

  return (
    <div className="p-6 text-center">
      <h2 className="text-lg font-semibold mb-4">🎉 Step 4: Result</h2>
      <ExamResult score={score} textAnswers={textAnswers} />

    </div>

  );
};

export default ExamPage;

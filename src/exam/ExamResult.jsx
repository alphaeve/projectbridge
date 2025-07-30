// File: /exam/ExamResult.jsx
import React, { useEffect } from "react";
import { examAuth, examDb } from "./firebaseExam";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ExamResult = ({ score, textAnswers }) => {
  useEffect(() => {
    const saveResult = async () => {
      const user = examAuth.currentUser;
      if (!user) return;

      try {
        await addDoc(collection(examDb, "examResults"), {
          email: user.email,
          score,
          passed: score >= 70,
          textAnswers: textAnswers || {},
          createdAt: serverTimestamp(),
        });
        console.log("✅ Score + Text Answers saved to Firestore");
      } catch (error) {
        console.error("❌ Error saving result:", error);
      }
    };

    saveResult();
  }, [score, textAnswers]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold">Your Score: {score}%</h2>
      {score >= 70 ? (
        <>
          <p className="text-green-600 mt-2">Congratulations! You passed the exam.</p>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">Download Certificate</button>
        </>
      ) : (
        <p className="text-red-600 mt-2">Sorry, you didn’t pass. Try again later!</p>
      )}
    </div>
  );
};

export default ExamResult;

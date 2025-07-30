// File: /exam/ExamLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { examAuth } from "./firebaseExam";
import { Link } from "react-router-dom";

const ExamLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(examAuth, email, password);
      } else {
        await signInWithEmailAndPassword(examAuth, email, password);
      }
      onLogin();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">{isRegister ? "Register" : "Login"} for Exam</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {isRegister ? "Register" : "Login"}
        </button>
        <p className="text-sm text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default ExamLogin;
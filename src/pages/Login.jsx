import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ For popup message
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("❌ All fields are required.");
      return;
    }

    try {
      // 🔍 Step 1: Find UID from username
      const usernameDoc = await getDoc(doc(db, "usernames", username));
      if (!usernameDoc.exists()) {
        alert("❌ Username not found.");
        return;
      }

      const { uid } = usernameDoc.data();

      // 🔍 Step 2: Get email and role from users collection
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        alert("❌ User profile not found.");
        return;
      }

      const { email, role } = userDoc.data();

      // ✅ Step 3: Sign in with email/password
      await signInWithEmailAndPassword(auth, email, password);

      // 🧠 Step 4: Set user in context
      login({ username, email, role });

      // ✅ Success message (1.5s), then navigate
      setSuccessMessage("✅ Logged in successfully! Redirecting...");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential") {
        alert("❌ Invalid username or password.");
      } else {
        alert("❌ Login failed. Try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-200 relative">

      {/* ✅ Popup Success Message */}
      {successMessage && (
        <div className="absolute top-[-70px] left-0 right-0 bg-blue-100 text-blue-800 border border-blue-300 px-4 py-3 rounded-lg text-center shadow-md animate-fade-in-down">
          {successMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
  });

  const [successMessage, setSuccessMessage] = useState(""); // ✅ New state for popup
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role } = formData;

    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      // 🔍 Check if username already exists
      const usernameRef = doc(db, "usernames", username);
      const usernameSnap = await getDoc(usernameRef);

      if (usernameSnap.exists()) {
        alert("❌ Username already taken. Try another one.");
        return;
      }

      // ✅ Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 📝 Store user data in Firestore
      await setDoc(doc(db, "users", uid), {
        username,
        email,
        role,
        createdAt: new Date(),
      });

      // 🔒 Mark username as taken
      await setDoc(usernameRef, { uid });

      // ✅ Show custom success message for 3 seconds, then navigate
      setSuccessMessage("🎉 Registered successfully! Redirecting to dashboard...");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("⚠️ This email is already in use. Please login instead.");
        navigate("/login");
      } else {
        alert("❌ Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-200 relative">

      {/* ✅ Success Message Popup */}
      {successMessage && (
        <div className="absolute top-[-70px] left-0 right-0 bg-blue-100 text-blue-800 border border-blue-300 px-4 py-3 rounded-lg text-center shadow-md animate-fade-in-down">
          {successMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="client">client</option>
          <option value="Developer">Developer</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

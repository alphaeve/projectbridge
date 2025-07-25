import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const PostProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    tech: "",
    description: "",
    deadline: "",
    contact: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.username || !user.email) {
      alert("User not logged in properly.");
      return;
    }

    try {
      const newProject = {
        ...form,
        postedBy: user.username,
        email: user.email,
        status: "Pending",
        createdAt: new Date(),
      };

      await addDoc(collection(db, "projects"), newProject);
      alert("✅ Project posted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting project:", error);
      alert("❌ Failed to post project. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Post a New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tech"
          placeholder="Tech Stack (e.g., React, Firebase)"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          className="w-full border border-gray-300 p-3 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="deadline"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Your Contact (Phone or Email)"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Post Project
        </button>
      </form>
    </div>
  );
};

export default PostProject;

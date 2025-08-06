import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const PostProject = () => {
  const { user, isSubscribed } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    tech: "",
    description: "",
    deadline: "",
    contact: "",
    cost: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.username || !user.email) {
      alert("User not logged in properly.");
      return;
    }

    if (user.role !== "client") {
      alert("Only clients can post projects.");
      return;
    }

    if (!isSubscribed) {
      alert("You need to subscribe to post a project.");
      return;
    }

    const newProject = {
      ...form,
      postedBy: user.username,
      email: user.email,
      owner: user.email,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "projects"), newProject);
      alert("✅ Project posted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting project:", error);
      alert("❌ Failed to post project. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">📢 Post a New Project</h2>

        {/* 🚫 Show subscribe warning if not subscribed */}
        {user?.role === "client" && !isSubscribed && (
          <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 p-4 rounded-md mb-6 text-center">
            🚫 You need an active subscription to post a project.{" "}
            <Link
              to="/subscribe"
              className="text-blue-600 underline font-semibold"
            >
              Subscribe Now
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            disabled={!isSubscribed}
          />

          <input
            type="text"
            name="tech"
            placeholder="Tech Stack (e.g., React, Firebase)"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            disabled={!isSubscribed}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            disabled={!isSubscribed}
          />

          <input
            type="date"
            name="deadline"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            disabled={!isSubscribed}
          />

          <input
            type="number"
            name="cost"
            placeholder="Project Budget (₹)"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            disabled={!isSubscribed}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Email or Phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            disabled={!isSubscribed}
          />

          <button
            type="submit"
            disabled={!isSubscribed}
            className={`w-full ${
              isSubscribed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold py-3 rounded-md transition`}
          >
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostProject;

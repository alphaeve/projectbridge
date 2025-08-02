import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ApplyProject = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    time: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      ...form,
      projectId: id, // ✅ Include this for dashboard mapping
      appliedBy: user?.email,
      appliedAt: new Date(),
    };

    try {
      await addDoc(collection(db, "applications"), application); // ✅ Save to Firestore
      alert("🎉 Application sent!");
      navigate("/projects");
    } catch (error) {
      console.error("❌ Error saving application:", error);
      alert("Failed to send application.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-12 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Apply to Project #{id}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
         

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ⏱️ Estimated Time (e.g., 5 days)
            </label>
            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter time estimation..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              💬 Message or Pitch
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Explain why you're a good fit..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-lg transition duration-300"
          >
            🚀 Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyProject;

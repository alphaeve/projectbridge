import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ApplyProject = () => {
  const { id } = useParams(); // project ID
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    price: "",
    time: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Applied to project:", id, {
      ...form,
      appliedBy: user?.email,
    });

    alert("Application sent!");
    navigate("/projects");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply to Project #{id}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="price"
          placeholder="Estimated Price (₹)"
          className="input w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Estimated Time (e.g. 5 days)"
          className="input w-full"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message or pitch"
          className="input w-full h-24"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyProject;

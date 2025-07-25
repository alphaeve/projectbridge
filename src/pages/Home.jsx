import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-blue-50">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-800">
          Welcome to <span className="text-blue-600">ProjectBridge</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Bridging the gap between students with ideas and coders with skills.
          Collaborate, build, and launch real-world projects together.
        </p>

        {!user ? (
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg shadow transition"
            >
              Login
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white rounded-lg shadow transition"
          >
            Go to Dashboard
          </Link>
        )}
      </section>

      {/* What We Do */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12 text-blue-700">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">📌 Post Projects</h3>
            <p className="text-gray-600">Students can submit project ideas and find collaborators.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">💻 Join as Coder</h3>
            <p className="text-gray-600">Coders browse available ideas and apply to contribute.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">🚀 Launch Together</h3>
            <p className="text-gray-600">Build and complete projects with teamwork & feedback.</p>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="px-6 py-20 bg-blue-50">
        <h2 className="text-3xl font-semibold text-center mb-12 text-blue-700">
          Our Journey So Far
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-4xl font-bold text-green-600">1,200+</h3>
            <p className="text-gray-600">Projects Posted</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">800+</h3>
            <p className="text-gray-600">Coders Joined</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-500">950+</h3>
            <p className="text-gray-600">Successful Collaborations</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-pink-500">5⭐</h3>
            <p className="text-gray-600">User Feedback</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12 text-blue-700">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md">
            <p className="text-gray-600">"I had an idea but no one to build it. Thanks to ProjectBridge, my app is now live!"</p>
            <p className="mt-4 text-blue-700 font-semibold">– Aanya, Student</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md">
            <p className="text-gray-600">"As a developer, I found real-world projects to work on and build my portfolio."</p>
            <p className="mt-4 text-blue-700 font-semibold">– Ravi, Coder</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t bg-blue-50">
        © {new Date().getFullYear()} ProjectBridge · Empowering student-coder collaboration
      </footer>
    </div>
  );
};

export default Home;

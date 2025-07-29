import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-r from-blue-100 via-blue-50 to-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-800 leading-tight">
          Welcome to <span className="text-blue-600">AcadUp</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Bridging the gap between students with ideas and coders with skills.
          Collaborate, build, and launch real-world projects together.
        </p>

        {!user ? (
          <div className="flex gap-6 flex-wrap justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              🔐 Login
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            Go to Dashboard
          </Link>
        )}
      </section>

      {/* What We Do */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {[
            { title: "📌 Post Projects", text: "Students can submit project ideas and find collaborators." },
            { title: "💻 Join as Coder", text: "Coders browse available ideas and apply to contribute." },
            { title: "🚀 Launch Together", text: "Build and complete projects with teamwork & feedback." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stats */}
      <section className="px-6 py-20 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          Our Journey So Far
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-5xl font-extrabold text-green-600">1,200+</h3>
            <p className="text-gray-600 mt-2">Projects Posted</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-yellow-500">800+</h3>
            <p className="text-gray-600 mt-2">Coders Joined</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-blue-500">950+</h3>
            <p className="text-gray-600 mt-2">Collaborations</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-pink-500">5⭐</h3>
            <p className="text-gray-600 mt-2">User Ratings</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              quote: `"I had an idea but no one to build it. Thanks to AcadUp, my app is now live!"`,
              name: "Aanya, Student",
            },
            {
              quote: `"As a developer, I found real-world projects to work on and build my portfolio."`,
              name: "Ravi, Coder",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-600 italic">“{testimonial.quote}”</p>
              <p className="mt-4 text-blue-700 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t bg-blue-50"> 
        © {new Date().getFullYear()} AcadUp · Empowering Student-Coder Collaboration
      </footer>
    </div>
  );
};

export default Home;

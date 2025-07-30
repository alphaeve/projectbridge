import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
     {/* Hero Section */}
     {/* 🎓 Highlighted Exam Call-To-Action */}
{/* 🎓 Compact Exam Ad Section */}
{/* 🎓 Compact Exam Ad Section */}
<section className="relative px-6 py-10 bg-gradient-to-br from-yellow-100 via-white to-pink-100 border-y border-yellow-300 shadow-inner">
  <div className="max-w-4xl mx-auto text-center relative">
    
    {/* 🆕 New badge */}
    <div className="absolute top-2 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
      🆕 NEW
    </div>

    <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
      Developer Skill Exam
    </h2>

    <p className="text-sm text-gray-600 mb-1 italic">
      Technical + Aptitude + Puzzle Based
    </p>

    <p className="text-sm text-pink-600 font-semibold mb-3">
      📅 Upcoming Soon!
    </p>

    <ul className="text-sm md:text-base text-gray-800 mb-4 leading-relaxed">
      <li>🏆 <strong>Top 3:</strong> Remote Developer Job Offer</li>
      <li>🎯 <strong>Rank 4–5:</strong> Remote Internship</li>
      <li>🎓 <strong>Rank 6–10:</strong> Certificate of Excellence</li>
    </ul>

    <Link
      to="/exam"
      className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
    >
      📝 Take the Exam
    </Link>

    <p className="mt-2 text-xs text-gray-600">₹100 only · 30-minute time-limited test</p>
  </div>
</section>



<section className="flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-r from-blue-100 via-white to-blue-50">
  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-800 leading-tight">
    Welcome to <span className="text-blue-600">AcadUp</span>
  </h1>
  <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10">
    Bridging the gap between <strong>clients with ideas</strong> and <strong>developers with skills</strong>. Collaborate, build, and launch real-world projects together.
  </p>

  {!user ? (
    <div className="flex gap-6 flex-wrap justify-center">
      <Link
        to="/register"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
      >
        🚀 Get Started
      </Link>
    </div>
  ) : (
    <Link
      to="/dashboard"
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
    >
      🔧 Go to Dashboard
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
            { title: "📌 Post Projects", text: "clients can submit project ideas and find collaborators." },
            { title: "💻 Join as Developer", text: "Developers browse available ideas and apply to contribute." },
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
            <p className="text-gray-600 mt-2">Developers Joined</p>
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
              name: "Aanya, client",
            },
            {
              quote: `"As a developer, I found real-world projects to work on and build my portfolio."`,
              name: "Ravi, Developer",
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
        © {new Date().getFullYear()} AcadUp · Empowering client-Developer Collaboration
      </footer>
    </div>
  );
};

export default Home;

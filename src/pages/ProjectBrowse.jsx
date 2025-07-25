import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const ProjectBrowse = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const getDeadlineColor = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = (end - now) / (1000 * 60 * 60 * 24); // days

    if (diff < 0) return "text-red-500";
    if (diff < 3) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-300">Available Projects</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search by title..."
        className="w-full mb-6 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-lg">🚫 No matching projects found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white bg-opacity-5 border border-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-200">{project.title}</h3>
              <p className="text-gray-300 mb-2">{project.description}</p>

              {project.tech && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-indigo-700 text-white rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {project.difficulty && (
                <span className="text-xs px-2 py-1 bg-yellow-600 text-white rounded-full mb-2 inline-block">
                  {project.difficulty}
                </span>
              )}

              <p className={`${getDeadlineColor(project.deadline)} text-sm`}>
                <strong>Deadline:</strong> {project.deadline}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Contact:</strong> {project.contact}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/project/${project.id}/apply`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                >
                  Apply Now
                </Link>
                <button
                  onClick={() => alert("Saved to favorites (placeholder)!")}
                  className="text-sm text-pink-300 hover:text-pink-500 transition"
                >
                  ❤️ Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectBrowse;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    const allProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Filter only projects posted by the logged-in client
    const clientProjects = allProjects.filter(
      (project) => project.postedBy === user?.email
    );

    setMyProjects(clientProjects);
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">My Posted Projects</h2>

      {myProjects.length === 0 ? (
        <p className="text-gray-600">No projects posted yet.</p>
      ) : (
        <div className="space-y-4">
          {myProjects.map((project) => (
            <div
              key={project.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p><strong>Tech:</strong> {project.tech}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p className="text-sm text-gray-500">Project ID: {project.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const getDeadlineColor = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = (end - now) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "text-red-600";
    if (diff < 3) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
      {/* Title and Platform */}
      <div className="mb-3">
        <h3 className="text-2xl font-semibold text-gray-900">{project.title}</h3>
        {project.platform && (
          <p className="text-sm text-blue-600 font-medium">{project.platform}</p>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      {project.tech && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.split(",").map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Difficulty */}
      {project.difficulty && (
        <span className="inline-block text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold mb-3">
          {project.difficulty}
        </span>
      )}

      {/* Metadata */}
      <ul className="text-sm space-y-1 mb-4">
        <li className={getDeadlineColor(project.deadline)}>
          <strong>Deadline:</strong> {project.deadline}
        </li>
        <li className="text-gray-600">
          <strong>Contact:</strong> {project.contact}
        </li>
        <li className="text-purple-700">
          <strong>Status:</strong> {project.status || "Open"}
        </li>
        <li className="text-purple-700">
          <strong>Project Budget (₹):</strong> {project.cost}
        </li>
      </ul>

      {/* Apply Button */}
      <div className="mt-4">
        <Link
          to={`/project/${project.id}/apply`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;

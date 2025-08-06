import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProjectCard from "../components/ProjectCard";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProjectBrowse = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [sort, setSort] = useState("deadline");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { user, isSubscribed } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSaveFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      if (sort === "difficulty") return a.difficulty.localeCompare(b.difficulty);
      if (sort === "Project Budget (₹)") return a.cost - b.cost;
      return 0;
    });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Explore Projects
      </h2>

      {/* 🔍 Search + Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search projects by title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm shadow-sm bg-white text-gray-700 focus:outline-none"
        >
          <option value="deadline">📅 Sort by Deadline</option>
          <option value="cost">₹ Sort by Cost</option>
          <option value="difficulty">⚙️ Sort by Difficulty</option>
        </select>
      </div>

      {/* 📦 Projects Grid */}
      {currentProjects.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">🚫 No matching projects found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSaveFavorite={handleSaveFavorite}
              isFavorite={favorites.includes(project.id)}
              role={user?.role}
              isSubscribed={isSubscribed}
            />
          ))}
        </div>
      )}

      {/* 🔁 Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectBrowse;

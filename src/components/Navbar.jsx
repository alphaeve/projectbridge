import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";
import Logo from "/acadup.png"; // Make sure the path is correct

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-blue-700 px-6 py-4 shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo Only */}
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-14 object-contain"
          />
        </Link>

        {/* Center: Username */}
        {user?.username && (
          <div className="hidden sm:block px-4 py-1 bg-blue-50 text-blue-800 font-medium rounded-full shadow-inner animate-fade-in">
            👋 Hello !, <span className="font-semibold">{user.username}</span>
          </div>
        )}

        {/* Right: Nav Links & Buttons */}
        <div className="space-x-6 flex items-center text-sm font-medium">
          <HoverLink to="/">Home</HoverLink>

          {user?.role === "student" && <HoverLink to="/post-project">Post Project</HoverLink>}
          {user?.role === "coder" && <HoverLink to="/projects">Browse Projects</HoverLink>}

          {user && (
            <>
              <HoverLink to="/dashboard">Dashboard</HoverLink>
              <HoverLink to="/chat/project123">Chat</HoverLink>
              <HoverLink to="/posts">Post Board</HoverLink>

              <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': {
                    borderColor: '#1e40af',
                    backgroundColor: '#f0f9ff',
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Logout
              </Button>
            </>
          )}

          {!user && (
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/login")}
                variant="outlined"
                sx={{
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': {
                    borderColor: '#1e40af',
                    backgroundColor: '#f0f9ff',
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                sx={{
                  backgroundColor: '#2563eb',
                  '&:hover': {
                    backgroundColor: '#1e40af',
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// ✨ Reusable animated link
const HoverLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative hover:text-blue-600 transition-all duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300"
  >
    {children}
  </Link>
);

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-blue-700 px-6 py-4 shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-blue-700 text-2xl font-extrabold tracking-wide hover:text-blue-800 transition duration-200"
        >
          Acad<span className="text-blue-500">Up</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-blue-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Username */}
        {user?.username && (
          <div className="hidden md:block px-4 py-1 bg-blue-50 text-blue-800 font-medium rounded-full shadow-inner">
            Hello, <span className="font-semibold">{user.username}</span>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <NavLinks user={user} handleLogout={handleLogout} navigate={navigate} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-sm font-medium">
          {user?.username && (
            <div className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-center">
              Hello, <span className="font-semibold">{user.username}</span>
            </div>
          )}
          <NavLinks user={user} handleLogout={handleLogout} navigate={navigate} isMobile />
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ user, handleLogout, navigate, isMobile }) => (
  <>
    <HoverLink to="/">Home</HoverLink>

    {user?.role === "client" && <HoverLink to="/post-project">Post Project</HoverLink>}
    {user?.role === "Developer" && <HoverLink to="/projects">Browse Projects</HoverLink>}

    {user && (
      <>
        <HoverLink to="/dashboard">Dashboard</HoverLink>
        <HoverLink to="/posts">Post Board</HoverLink>
      </>
    )}

    <HoverLink to="/about">About</HoverLink>
    <HoverLink to="/contact">Contact Us</HoverLink>

    {/* Legal group for desktop */}
    {!isMobile && (
      <div className="relative group">
        <button className="flex items-center gap-1 hover:text-blue-600 transition-all">
          Legal <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute top-6 left-0 hidden group-hover:flex flex-col bg-white border rounded-md shadow-md p-2 z-50 min-w-[180px]">
          <HoverLink to="/privacy-policy" className="px-2 py-1 hover:bg-gray-100 rounded">Privacy Policy</HoverLink>
          <HoverLink to="/terms" className="px-2 py-1 hover:bg-gray-100 rounded">Terms & Conditions</HoverLink>
          <HoverLink to="/cancel-refund" className="px-2 py-1 hover:bg-gray-100 rounded">Cancel & Refund</HoverLink>
        </div>
      </div>
    )}

    {/* Show all in mobile directly */}
    {isMobile && (
      <>
        <HoverLink to="/privacy-policy">Privacy Policy</HoverLink>
        <HoverLink to="/terms">Terms & Conditions</HoverLink>
        <HoverLink to="/cancel-refund">Cancel & Refund</HoverLink>
      </>
    )}

    {/* Auth Buttons */}
    {user ? (
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
          marginTop: isMobile ? '0.5rem' : 0,
        }}
      >
        Logout
      </Button>
    ) : (
      <div className={isMobile ? "flex flex-col gap-2" : "flex gap-4"}>
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
  </>
);

const HoverLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`relative hover:text-blue-600 transition-all duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 ${className}`}
  >
    {children}
  </Link>
);

export default Navbar;

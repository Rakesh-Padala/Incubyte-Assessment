import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🍬 SweetMart
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-200">
            Home
          </Link>

          <Link to="/sweets" className="hover:text-yellow-200">
            Sweets
          </Link>

          {/* ADMIN ONLY */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full hover:bg-yellow-300"
            >
              Admin Panel
            </Link>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-yellow-200">
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-purple-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-yellow-200">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

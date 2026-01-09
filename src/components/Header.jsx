// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="px-4 pt-4 relative z-50">
      <div
        className="max-w-6xl mx-auto bg-gray-900/80 border border-gray-800/80
                   rounded-2xl px-6 py-4 flex items-center justify-between
                   shadow-[0_0_35px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl
                          bg-gradient-to-br from-red-600 via-red-500 to-yellow-400 text-black font-extrabold text-xl">
            M
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              MOVIES
            </span>
            <span className="text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-gray-400">
              Watch · Explore · Enjoy
            </span>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-gray-200 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Nav Links */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm absolute sm:static top-full left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent p-4 sm:p-0 rounded-b-xl sm:rounded-none`}
        >
          <Link
            to="/"
            className="relative text-gray-200 hover:text-white transition-colors
                       after:content-[''] after:absolute after:left-0 after:-bottom-1
                       after:h-[2px] after:w-0 after:bg-gradient-to-r from-red-500 to-orange-400
                       hover:after:w-full after:transition-all after:duration-200"
          >
            Home
          </Link>

          <Link
            to="/movies"
            className="relative text-gray-200 hover:text-white transition-colors
                       after:content-[''] after:absolute after:left-0 after:-bottom-1
                       after:h-[2px] after:w-0 after:bg-gradient-to-r from-red-500 to-orange-400
                       hover:after:w-full after:transition-all after:duration-200"
          >
            Movies
          </Link>

          <Link
            to="/watchlist"
            className="relative text-gray-200 hover:text-white transition-colors
                       after:content-[''] after:absolute after:left-0 after:-bottom-1
                       after:h-[2px] after:w-0 after:bg-gradient-to-r from-red-500 to-orange-400
                       hover:after:w-full after:transition-all after:duration-200"
          >
            Watchlist
          </Link>

          {user ? (
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <span className="text-xs text-gray-300">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-full text-xs font-medium
                           border border-gray-600 text-gray-200
                           hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-1.5 rounded-full text-xs font-medium
                         bg-gradient-to-r from-red-600 to-orange-500 text-white
                         hover:from-red-500 hover:to-orange-400 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
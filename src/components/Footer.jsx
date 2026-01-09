
import React from "react";

function Footer() {
  return (
    <footer className="mt-12 bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 md:gap-0 md:items-start md:justify-between">
       
        <div>
          <h3 className="text-white text-lg font-semibold">MovieVerse</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-xs">
            Discover trending TV shows and movies with a clean, React & Tailwind
            interface powered by live data.
          </p>
        </div>

      
        <div className="flex gap-10">
          <div>
            <h4 className="text-gray-300 text-sm font-medium mb-2">Browse</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Home</li>
              <li>Popular</li>
              <li>Top Rated</li>
              <li>Watchlist</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-300 text-sm font-medium mb-2">Support</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>

       
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">
            Stay connected
          </h4>
          <p className="text-gray-400 text-sm">
            Built as a learning project using React, Axios and Tailwind CSS.
          </p>
          <div className="flex gap-3 mt-3 text-gray-400 text-xs">
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Portfolio</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MovieVerse. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-500 text-center md:text-right">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

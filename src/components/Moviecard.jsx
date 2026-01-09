import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

function Moviecard() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY; // ✅ Vite env variable
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => setShows(res.data.results || []))
      .catch(console.error);
  }, []);

  const totalShows = shows.length;
  const avgRating =
    totalShows > 0
      ? (
          shows.reduce((sum, s) => sum + (s.vote_average || 0), 0) / totalShows
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Popular Shows
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl">
            Discover what everyone is watching right now. These trending TV shows
            are fetched live from TMDB and updated regularly.
          </p>
        </div>

        {/* Stats summary */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-sm md:text-base">
          <div className="flex-1 sm:flex-none bg-gray-900/80 border border-gray-800 rounded-xl px-4 py-3 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">Total shows</p>
            <p className="text-white font-semibold text-base sm:text-lg">
              {totalShows}
            </p>
          </div>
          <div className="flex-1 sm:flex-none bg-gray-900/80 border border-gray-800 rounded-xl px-4 py-3 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">Average rating</p>
            <p className="text-white font-semibold text-base sm:text-lg">
              {avgRating}
            </p>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
          {shows.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="max-w-7xl mx-auto mt-10 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">
            Watch smarter, not harder
          </h3>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Quickly explore the most popular TV shows on the platform. Use this
            as a starting point for your watchlist, discover new genres, and
            practice building real React UI around live API data.
          </p>
        </div>
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">
            Powered by TMDB
          </h3>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            All posters, titles, ratings and popularity data are fetched from
            The Movie Database (TMDB) API, giving you realistic content to work
            with in your project.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Moviecard;
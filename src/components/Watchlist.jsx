// src/components/Watchlist.jsx
import React, { useState } from "react";

function Watchlist({ user, watchlist, deletefromwatchlist }) {
  const [deleting, setDeleting] = useState(null); // Track which movie is being deleted
  const count = watchlist.length;

  // Delete with loading state and confirmation
  async function handleDelete(movieId, movieTitle) {
    if (deleting) return; // Prevent multiple deletions at once
    
    // Optional: Ask for confirmation
    const confirmed = window.confirm(
      `Remove "${movieTitle}" from your watchlist?`
    );
    
    if (!confirmed) return;

    try {
      setDeleting(movieId);
      await deletefromwatchlist(movieId);
      // Success notification handled in App.jsx or can add here
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Sign in to view your watchlist</h2>
          <p className="text-gray-400">Please sign in to manage your movies.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Your Watchlist
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, {user.name}!
          </p>
        </div>
        <span className="text-xs sm:text-sm text-gray-400">
          {count} {count === 1 ? 'movie' : 'movies'} saved
        </span>
      </div>

      <div className="max-w-6xl mx-auto bg-gray-900/80 border border-gray-800/80 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800/80 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Showing <span className="text-gray-100 font-medium">{count}</span>{" "}
            {count === 1 ? 'result' : 'results'}
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-900/90">
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 w-40">Poster</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Popularity</th>
                <th className="px-6 py-3">Genre</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {watchlist.map((movie) => {
                const imageUrl =
                  movie.poster ||
                  (movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image");

                const title =
                  movie.title || movie.original_name || "Untitled";
                const genresText =
                  Array.isArray(movie.genres)
                    ? movie.genres.join(", ")
                    : movie.genres?.map?.((g) => g.name).join(", ") || "—";
                
                const movieId = movie.movieId || movie.id;
                const isDeleting = deleting === movieId;

                return (
                  <tr
                    key={movieId}
                    className="hover:bg-gray-800/70 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="h-24 w-16 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={imageUrl}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-100">
                          {title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {movie.status || "Plan to watch"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        ★{" "}
                        {movie.vote_average != null
                          ? movie.vote_average.toFixed
                            ? movie.vote_average.toFixed(1)
                            : movie.vote_average
                          : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-middle text-gray-300">
                      {movie.popularity ?? "N/A"}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 text-xs">
                        {genresText}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDelete(movieId, title)}
                          disabled={isDeleting}
                          className={`
                            px-4 py-2 text-xs font-medium rounded-full 
                            bg-red-500/20 text-red-300 border border-red-500/40 
                            hover:bg-red-500/40 transition-colors duration-150
                            ${isDeleting ? 'opacity-50 cursor-wait' : ''}
                            disabled:cursor-not-allowed
                          `}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {count === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg">No movies in your watchlist yet.</p>
                      <p className="text-sm">Start adding movies to build your collection!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile layout */}
        <div className="block md:hidden">
          {watchlist.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 p-4">
              {watchlist.map((movie) => {
                const imageUrl =
                  movie.poster ||
                  (movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image");
                const title =
                  movie.title || movie.original_name || "Untitled";
                const genresText =
                  Array.isArray(movie.genres)
                    ? movie.genres.join(", ")
                    : movie.genres?.map?.((g) => g.name).join(", ") || "—";
                
                const movieId = movie.movieId || movie.id;
                const isDeleting = deleting === movieId;

                return (
                  <div
                    key={movieId}
                    className="bg-gray-900/70 rounded-lg shadow-md overflow-hidden flex flex-col"
                  >
                    {/* Poster */}
                    <div className="h-40 w-full">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="block font-medium text-gray-100 text-sm truncate">
                          {title}
                        </span>
                        <p className="text-xs text-gray-500">
                          {movie.status || "Plan to watch"}
                        </p>
                        <p className="text-xs text-amber-300">
                          ★ {movie.vote_average ?? "N/A"}
                        </p>
                        <p className="text-xs text-gray-300">
                          Popularity: {movie.popularity ?? "N/A"}
                        </p>
                        <p className="text-xs text-red-300 truncate">
                          Genre: {genresText}
                        </p>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(movieId, title)}
                        disabled={isDeleting}
                        className={`
                          mt-2 px-3 py-1 text-xs font-medium rounded-full 
                          bg-red-500/20 text-red-300 border border-red-500/40 
                          hover:bg-red-500/40 transition-colors
                          ${isDeleting ? 'opacity-50 cursor-wait' : ''}
                          disabled:cursor-not-allowed
                        `}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-10 text-center text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <p className="text-base">No movies in your watchlist yet.</p>
                <p className="text-sm">Start adding movies to build your collection!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
// Movies.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function Movies({ addtowatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [rate, setRate] = useState("");

  function handlegenre(event) {
    setGenre(event.target.value);
  }

  function low() {
    const a = movies
      .slice()
      .sort((movieA, movieB) => movieA.vote_average - movieB.vote_average);
    setMovies(a);
  }

  function top() {
    const b = movies
      .slice()
      .sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
    setMovies(b);
  }

  function handlefilter(event) {
    setSearch(event.target.value);
  }

  function handlerate(event) {
    const value = event.target.value;
    setRate(value);
    if (value === "top") top();
    else low();
  }

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) {
      console.error("TMDB API key is missing. Check your .env file.");
      return;
    }
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then((res) => setMovies(res.data.results || []))
      .catch(console.error);
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Movies
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Browse trending Movies fetched live from TMDB.
          </p>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 mt-1 md:mt-0">
          Page {page}
        </span>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-1/3">
          <input
            onChange={handlefilter}
            value={search}
            type="text"
            placeholder="Search by name..."
            className="w-full bg-gray-900/80 border border-gray-700/80 rounded-full
                       px-4 py-2 text-sm text-gray-100
                       placeholder:text-gray-500 focus:outline-none
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            onChange={handlerate}
            value={rate}
            className="bg-gray-900/80 border border-gray-700/80 rounded-full
                       px-3 py-2 text-sm text-gray-100 focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          >
            <option value="top">Top Rating</option>
            <option value="low">Low Rating</option>
          </select>

          <select
            onChange={handlegenre}
            value={genre}
            className="bg-gray-900/80 border border-gray-700/80 rounded-full
                       px-3 py-2 text-sm text-gray-100 focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All genres</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="9648">Mystery</option>
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {movies
            .filter((val) => {
              const matchesSearch = (
                val.name ||
                val.title ||
                val.original_name ||
                ""
              )
                .toLowerCase()
                .includes(search.toLowerCase());
              const matchesGenre =
                !genre || val.genre_ids?.includes(Number(genre));
              return matchesSearch && matchesGenre;
            })
            .map((item) => (
              <Card
                key={item.id}
                data={item}
                addtowatchlist={addtowatchlist}
                watchlist={watchlist}
              />
            ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`p-2 sm:p-3 rounded-full border 
                      ${
                        page === 1
                          ? "border-gray-700 text-gray-600 cursor-not-allowed"
                          : "border-gray-600 text-gray-200 hover:bg-gray-800"
                      }
                      transition-colors`}
        >
          <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="px-4 py-2 rounded-full bg-gray-900/80 border border-gray-700 text-sm sm:text-base">
          Page <span className="font-semibold text-blue-400">{page}</span>
        </div>

        <button
          onClick={nextPage}
          className="p-2 sm:p-3 rounded-full border border-gray-600 text-gray-200
                     hover:bg-gray-800 transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
}

export default Movies;
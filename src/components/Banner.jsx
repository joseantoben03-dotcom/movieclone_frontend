// src/components/Banner.jsx
import React from "react";
import banner from "../assets/images/download.jpg";

function Banner({ addtowatchlist }) {
  const pushpaMovie = {
    id: 837051,
    title: "Pushpa: The Rise",
    original_name: "Pushpa",
    poster_path: "/rcBcSBq9Ltn5XoI0SAyCNdp2iM.jpg",
    backdrop_path: "/rcBcSBq9Ltn5XoI0SAyCNdp2iM.jpg",
    vote_average: 8.0,
    popularity: 85,
    release_date: "2021-12-17",
    runtime: 179,
    genre_ids: [28, 53],
    overview:
      "An intense action drama set in the red sandalwood smuggling world, following a man's rise through power, loyalty, and chaos.",
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black py-6">
      <div
        className="
          relative max-w-7xl mx-auto
          h-[20rem] sm:h-[26rem] md:h-[34rem] lg:h-[40rem]
          rounded-xl overflow-hidden
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
          px-4 sm:px-6
        "
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${banner})` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          {/* Text section */}
          <div className="text-left text-white max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight drop-shadow-lg">
              {pushpaMovie.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
              {pushpaMovie.overview}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-[0.7rem] sm:text-xs md:text-sm text-gray-200">
              <span className="px-3 py-1 rounded-full bg-red-600/80 text-xs sm:text-sm">
                Action · Thriller
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                {pushpaMovie.release_date.slice(0, 4)} ·{" "}
                {formatRuntime(pushpaMovie.runtime)}
              </span>
              <span className="flex items-center gap-1 text-amber-300">
                ★ {pushpaMovie.vote_average}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3 justify-start md:justify-end flex-wrap">
            <button className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-medium text-sm sm:text-base hover:bg-gray-200 transition">
              ▶ Play
            </button>
            <button
              onClick={() => addtowatchlist(pushpaMovie)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 text-white font-medium text-sm sm:text-base border border-white/30 hover:bg-white/20 transition"
            >
              + Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;

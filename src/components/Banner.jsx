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
    <div className="w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black py-4 sm:py-6">
      <div
        className="
          relative max-w-7xl mx-auto
          h-[18rem] sm:h-[24rem] md:h-[32rem] lg:h-[38rem]
          rounded-xl overflow-hidden
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
          px-3 sm:px-6
        "
      >
        {/* Background image */}
        <div
          className="
            absolute inset-0
            bg-center bg-no-repeat
            bg-contain sm:bg-cover   /* contain on mobile, cover from sm up */
          "
          style={{ backgroundImage: `url(${banner})` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          {/* Text section */}
          <div className="text-left text-white max-w-xl">
            <h2 className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tight drop-shadow-lg">
              {pushpaMovie.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-none">
              {pushpaMovie.overview}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-[0.7rem] sm:text-xs md:text-sm text-gray-200">
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
          <div className="flex gap-2 sm:gap-3 justify-start md:justify-end flex-wrap mt-2 md:mt-0">
            <button className="px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm md:text-base hover:bg-gray-200 transition">
              ▶ Play
            </button>
            <button
              onClick={() => addtowatchlist(pushpaMovie)}
              className="px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white/10 text-white font-medium text-xs sm:text-sm md:text-base border border-white/30 hover:bg-white/20 transition"
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

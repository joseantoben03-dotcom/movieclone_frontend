// MovieDetails.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails({ addtowatchlist, watchlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const isInWatchlist = watchlist.some(
    (m) => (m.movieId || m.id) === Number(id)
  );
  const [added, setAdded] = useState(isInWatchlist);

  useEffect(() => {
    setAdded(isInWatchlist);
  }, [isInWatchlist]);

  async function handleAdd() {
    if (!movie || added) return;
    try {
      await addtowatchlist({
        ...movie,
        id: movie.id || Number(id),
      });
      setAdded(true);
    } catch (err) {
      console.error("Add from details failed", err);
    }
  }

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY; // ✅ use env variable
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
      )
      .then((res) => setMovie(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w780${
        movie.backdrop_path || movie.poster_path
      }`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            Loading details...
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-10 items-stretch mt-10">
            {/* Poster / Backdrop */}
            <div className="w-full xl:w-3/5">
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
                {movie?.poster_path || movie?.backdrop_path ? (
                  <img
                    src={imageUrl}
                    alt={movie?.original_name || "Movie poster"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Text Panel */}
            <div className="w-full xl:w-2/5 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-tight">
                  {movie?.name}
                </h1>
                {movie?.tagline && (
                  <p className="italic text-gray-400">{movie.tagline}</p>
                )}

                {/* Basic Info */}
                <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                  <span>
                    <span className="text-gray-400">Language:</span>{" "}
                    {movie?.original_language?.toUpperCase()}
                  </span>
                  <span>
                    <span className="text-gray-400">Type:</span> {movie?.type}
                  </span>
                  <span>
                    <span className="text-gray-400">Status:</span>{" "}
                    {movie?.status}
                  </span>
                  <span>
                    <span className="text-gray-400">First Air Date:</span>{" "}
                    {movie?.first_air_date}
                  </span>
                  <span>
                    <span className="text-gray-400">Last Air Date:</span>{" "}
                    {movie?.last_air_date}
                  </span>
                  <span>
                    <span className="text-gray-400">Seasons:</span>{" "}
                    {movie?.number_of_seasons}
                  </span>
                  <span>
                    <span className="text-gray-400">Episodes:</span>{" "}
                    {movie?.number_of_episodes}
                  </span>
                  <span>
                    <span className="text-gray-400">Rating:</span>{" "}
                    {movie?.vote_average} ({movie?.vote_count} votes)
                  </span>
                  <span>
                    <span className="text-gray-400">Popularity:</span>{" "}
                    {movie?.popularity}
                  </span>
                </div>

                {/* Overview */}
                {movie?.overview && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Overview</h2>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      {movie.overview}
                    </p>
                  </div>
                )}

                {/* Genres */}
                {movie?.genres?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Genres</h2>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((g) => (
                        <span
                          key={g.id}
                          className="px-3 py-1.5 rounded-full bg-gray-800 text-xs uppercase tracking-wide"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={handleAdd}
                  className="px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
                >
                  {added ? "Added" : "Add to Watchlist"}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2.5 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-gray-800"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
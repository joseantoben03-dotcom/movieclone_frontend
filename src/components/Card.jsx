import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ data, addtowatchlist, watchlist = [] }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!data || !data.poster_path) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${
    data.backdrop_path || data.poster_path
  }`;

  // ✅ useEffect must not be inside a try block
  useEffect(() => {
    const inList = watchlist.some((m) => (m.movieId || m.id) === data.id);
    setClicked(inList);
  }, [watchlist, data.id]);

  function handleCardClick() {
    navigate(`/moviedetail/${data.id}`);
  }

  // ✅ async handler for adding to watchlist
  async function handleAddClick(e) {
    e.stopPropagation();

    if (clicked) {
      alert("This movie is already in your watchlist!");
      return;
    }

    if (loading) return; // Prevent multiple clicks

    try {
      setLoading(true);
      await addtowatchlist?.(data);

      // ✅ Only set clicked to true if successfully added
      setClicked(true);

      // ✅ Show success notification
      alert(`"${data.original_name || data.title}" added to watchlist!`);
    } catch (err) {
      console.error("Add from card failed:", err);
      // Don't set clicked if there was an error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-2 w-full">
      <div
        onClick={handleCardClick}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="
          relative 
          h-[200px] sm:h-[240px] md:h-[260px] 
          w-full 
          bg-center bg-cover rounded-xl overflow-hidden
          shadow-lg shadow-black/60 hover:shadow-2xl hover:shadow-black/80
          hover:cursor-pointer transform transition-transform duration-200 hover:scale-105
        "
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="w-full px-2 py-2 bg-black/40 backdrop-blur-sm">
            <p className="text-xs sm:text-sm md:text-base text-gray-100 font-medium truncate">
              {data.original_name || data.title}
            </p>
            {data.vote_average && (
              <p className="mt-1 text-xs sm:text-sm text-amber-300 flex items-center gap-1">
                ★ {data.vote_average.toFixed(1)}
              </p>
            )}

            <button
              onClick={handleAddClick}
              disabled={loading}
              className={`
                mt-1 text-[0.65rem] sm:text-sm px-2 py-1 rounded-full 
                border border-white/30 transition-all
                ${
                  clicked
                    ? "bg-green-600/80 text-white border-green-400"
                    : "bg-white/10 text-white hover:bg-white/20"
                }
                ${loading ? "opacity-50 cursor-wait" : ""}
                disabled:cursor-not-allowed
              `}
            >
              {loading ? "Adding..." : clicked ? "✓ Added" : "+ Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
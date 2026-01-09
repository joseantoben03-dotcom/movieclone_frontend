import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ data, addtowatchlist, watchlist = [] }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  if (!data || !data.poster_path) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${
    data.backdrop_path || data.poster_path
  }`;


  useEffect(() => {
    const inList = watchlist.some(
      (m) => (m.movieId || m.id) === data.id
    );
    setClicked(inList);
   
  }, [watchlist, data.id]);

  function handleCardClick() {
    navigate(`/moviedetail/${data.id}`);
  }

  async function handleAddClick(e) {
    e.stopPropagation();
    if (clicked) return;

    try {
      await addtowatchlist?.(data);
      setClicked(true);
    } catch (err) {
      console.error("Add from card failed", err);
    }
  }

  return (
    <div className="w-[180px] m-3">
      <div
        onClick={handleCardClick}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="relative h-[260px] w-full bg-center bg-cover rounded-xl overflow-hidden
                   shadow-lg shadow-black/60 hover:shadow-2xl hover:shadow-black/80
                   hover:cursor-pointer transform transition-transform duration-200 hover:scale-110"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="w-full px-2 py-2 bg-black/40 backdrop-blur-sm">
            <p className="text-[0.7rem] text-gray-100 font-medium truncate">
              {data.original_name || data.title}
            </p>
            {data.vote_average && (
              <p className="mt-1 text-[0.65rem] text-amber-300 flex items-center gap-1">
                ★ {data.vote_average.toFixed(1)}
              </p>
            )}

            <button
              onClick={handleAddClick}
              className="mt-1 text-[0.6rem] px-2 py-1 rounded-full bg-white/10 text-white border border-white/30"
            >
              {clicked ? "Added" : "+ Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

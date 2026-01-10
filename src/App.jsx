// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Banner from "./components/Banner";
import Header from "./components/Header";
import Moviecard from "./components/Moviecard";
import Watchlist from "./components/Watchlist";
import Movies from "./components/Movie";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [watchlist, setWatchlist] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE); // backend URL from env

  // Load watchlist from backend
  useEffect(() => {
    async function fetchWatchlist() {
      if (!user?.token) {
        setWatchlist([]);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/watchlist`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setWatchlist(res.data.watchlist || []);
      } catch (err) {
        console.error(
          "Failed to load watchlist",
          err.response?.data || err.message
        );
      }
    }
    fetchWatchlist();
  }, [user, API_BASE]);

  // Add to watchlist
  async function addtowatchlist(movie) {
    if (!user?.token) {
      alert("Please sign in to add movies to your watchlist.");
      throw new Error("Not logged in");
    }

    const movieId = movie.id || movie.movieId;
    const exists = watchlist.some((m) => (m.movieId || m.id) === movieId);
    if (exists) return;

    try {
      await axios.post(
        `${API_BASE}/watchlist/add`,
        {
          movieId,
          title: movie.title || movie.name || movie.original_name,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : movie.poster,
          vote_average: movie.vote_average,
          popularity: movie.popularity,
          genres: movie.genres?.map((g) => g.name) || movie.genre_ids || [],
          status: "plan",
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setWatchlist((prev) => [
        ...prev,
        {
          movieId,
          title: movie.title || movie.name || movie.original_name,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : movie.poster,
          vote_average: movie.vote_average,
          popularity: movie.popularity,
          genres: movie.genres?.map((g) => g.name) || [],
          status: "plan",
        },
      ]);
    } catch (err) {
      console.error(
        "Failed to add to watchlist",
        err.response?.data || err.message
      );
      alert("Could not add to watchlist");
      throw err;
    }
  }

  // Delete from watchlist
  async function deletefromwatchlist(id) {
    if (!user?.token) {
      alert("Please sign in first.");
      return;
    }
    const movieId = id;

    try {
      await axios.delete(`${API_BASE}/watchlist/${movieId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWatchlist((prev) =>
        prev.filter((m) => (m.movieId || m.id) !== movieId)
      );
    } catch (err) {
      console.error(
        "Failed to delete from watchlist",
        err.response?.data || err.message
      );
      alert("Could not delete from watchlist");
    }
  }

  function handleLoginSuccess(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    setWatchlist([]);
    localStorage.removeItem("user");
  }

  return (
    <div className="flex flex-col gap-6 bg-black min-h-screen">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col gap-6">
              <Banner addtowatchlist={addtowatchlist} />
              <Moviecard addtowatchlist={addtowatchlist} />
            </div>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              user={user} // full user object (has token)
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              addtowatchlist={addtowatchlist}
              watchlist={watchlist}
            />
          }
        />
        <Route
          path="/moviedetail/:id"
          element={
            <MovieDetails
              addtowatchlist={addtowatchlist}
              watchlist={watchlist}
            />
          }
        />
        <Route
          path="/signin"
          element={<Signin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

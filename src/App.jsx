// src/App.jsx - Improved Version
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

  // ✅ Define handleLogout BEFORE it's used
  function handleLogout() {
    setUser(null);
    setWatchlist([]);
    localStorage.removeItem("user");
  }

  // ✅ Improved: Better error handling for API base URL
  useEffect(() => {
    if (!API_BASE) {
      console.error("⚠️ VITE_API_BASE_URL is not defined in .env file!");
    } else {
      console.log("✅ API Base URL:", API_BASE);
    }
  }, [API_BASE]);

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
        
        // ✅ Your backend returns { username, watchlist }
        setWatchlist(res.data.watchlist || []);
        
      } catch (err) {
        console.error("Failed to load watchlist:", err.response?.data || err.message);
        
        // ✅ Improved: Handle token expiration
        if (err.response?.status === 401) {
          console.log("Token expired or invalid. Please sign in again.");
          handleLogout();
        }
      }
    }
    fetchWatchlist();
  }, [user, API_BASE]);

  // Add to watchlist
  async function addtowatchlist(movie) {
    if (!user?.token) {
      alert("Please sign in to add movies to your watchlist.");
      throw new Error("Not logged in"); // Throw error so Card component knows it failed
    }

    const movieId = movie.id || movie.movieId;
    const exists = watchlist.some((m) => (m.movieId || m.id) === movieId);
    
    if (exists) {
      console.log("Movie already in watchlist");
      return;
    }

    try {
      const response = await axios.post(
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

      // ✅ Use backend response for consistency
      setWatchlist(response.data.watchlist || []);
      
    } catch (err) {
      console.error("Failed to add to watchlist:", err.response?.data || err.message);
      
      // ✅ Improved: Better error messages
      if (err.response?.status === 401) {
        alert("Your session has expired. Please sign in again.");
        handleLogout();
      } else if (err.response?.status === 400) {
        alert(err.response.data.message || "Movie already in watchlist");
      } else {
        alert("Could not add to watchlist. Please try again.");
      }
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
      const response = await axios.delete(`${API_BASE}/watchlist/${movieId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      
      // ✅ Use backend response for consistency
      setWatchlist(response.data.watchlist || []);
      
    } catch (err) {
      console.error("Failed to delete from watchlist:", err.response?.data || err.message);
      
      // ✅ Improved: Better error handling
      if (err.response?.status === 401) {
        alert("Your session has expired. Please sign in again.");
        handleLogout();
      } else if (err.response?.status === 404) {
        alert("Movie not found in watchlist");
      } else {
        alert("Could not delete from watchlist. Please try again.");
      }
    }
  }

  function handleLoginSuccess(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  return (
    <div className="flex flex-col gap-6 bg-black min-h-screen">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col gap-6">
              <Banner addtowatchlist={addtowatchlist} watchlist={watchlist} />
              <Moviecard addtowatchlist={addtowatchlist} watchlist={watchlist} />
            </div>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              user={user}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              deletefromwatchlist={deletefromwatchlist}
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
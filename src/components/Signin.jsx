// src/components/Signin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.post(`${API_BASE}/signin`, {
        email: form.email,
        password: form.password,
      });

      // backend returns: { message, userId, name, token }
      const userData = {
        userId: res.data.userId,
        name: res.data.name,
        email: form.email,        // or res.data.email if you add it in backend
        token: res.data.token,    // ✅ needed for Authorization header
      };

      // lift user to App state + localStorage (App already stores it)
      onLoginSuccess(userData);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/90 border border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        {/* Logo / heading */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-orange-400 text-black font-extrabold text-2xl">
            M
          </div>
          <h1 className="text-2xl font-semibold text-white">Sign in</h1>
          <p className="mt-1 text-sm text-gray-400">
            Sign in to continue watching and managing your watchlist.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs sm:text-sm">{error}</p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-gray-600 bg-gray-900"
              />
              Remember me
            </label>
            <button type="button" className="hover:text-gray-200">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-sm font-medium text-white hover:from-red-500 hover:to-orange-400 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Small footer text */}
        <p className="mt-4 text-center text-xs text-gray-500">
          New here?{" "}
          <span className="text-red-400">
            Create an account <Link to="/signup">Click here</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;

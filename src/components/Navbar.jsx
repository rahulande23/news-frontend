import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">NewsFlow</span>
        </Link>

        <form className="search-form" onSubmit={handleSearch} role="search">
          <div className="search-wrap">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search news"
            />
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            to="/search"
            className={location.pathname === "/search" ? "active" : ""}
          >
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
}

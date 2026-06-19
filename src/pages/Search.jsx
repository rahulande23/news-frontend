import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchNews } from "../api";
import NewsCard from "../components/NewsCard";
import { SkeletonGrid } from "../components/Loader";
import "./Search.css";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [inputVal, setInputVal] = useState("");

  const q = searchParams.get("q") || "";

  useEffect(() => {
    setInputVal(q);
    setPage(1);
  }, [q]);

  useEffect(() => {
    if (!q) return;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await searchNews(q, page);
        const valid = (data.articles || []).filter(
          (a) => a.title && a.title !== "[Removed]",
        );
        setArticles(valid);
        setTotalResults(data.totalArticles || 0);
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchParams({ q: inputVal.trim() });
    }
  };

  const totalPages = Math.ceil(Math.min(totalResults, 100) / 12);

  return (
    <main className="search-page">
      <div className="page-inner">
        <form className="search-hero" onSubmit={handleSubmit} role="search">
          <h1>Explore News</h1>
          <div className="hero-search-wrap">
            <input
              type="search"
              placeholder="Search topics, events, people..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              aria-label="Search query"
              autoFocus
            />
            <button type="submit" aria-label="Submit search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Search
            </button>
          </div>
        </form>

        {q && !loading && (
          <p className="results-meta">
            {totalResults > 0
              ? `About ${totalResults.toLocaleString()} results for "${q}"`
              : `No results for "${q}"`}
          </p>
        )}

        {error && (
          <div className="error-banner" role="alert">
            ⚠️ {error}
          </div>
        )}

        {!q && !loading && (
          <div className="empty-state">
            <span>🔍</span>
            <p>Search for any news topic above</p>
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="news-grid">
            {articles.map((article, i) => (
              <NewsCard key={article.url || i} article={article} />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Prev
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

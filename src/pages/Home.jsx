import React, { useState, useEffect, useCallback } from "react";
import { fetchTopHeadlines } from "../api";
import NewsCard from "../components/NewsCard";
import CategoryTabs from "../components/CategoryTabs";
import { SkeletonGrid } from "../components/Loader";
import "./Home.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (cat, pg) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await fetchTopHeadlines(cat, "us", pg);
      const valid = (data.articles || []).filter(
        (a) => a.title && a.title !== "[Removed]",
      );
      setArticles(valid);
      setTotalResults(data.totalArticles || 0);
    } catch (err) {
      console.error(
        "fetchTopHeadlines error:",
        err?.response?.data || err?.message || err,
      );
      setError("Failed to load news. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(category, page);
  }, [category, page, load]);

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const featured = articles[0];
  const rest = articles.slice(1);
  const totalPages = Math.ceil(Math.min(totalResults, 100) / 12);

  return (
    <main className="home-page">
      <div className="page-inner">
        <header className="page-header">
          <h1>Top Headlines</h1>
          <p className="subtitle">
            Stay updated with the latest news from around the world
          </p>
        </header>

        <CategoryTabs active={category} onChange={handleCategory} />

        {error && (
          <div className="error-banner" role="alert">
            <span>⚠️</span> {error}
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : articles.length === 0 ? (
          <div className="empty-state">
            <span>📰</span>
            <p>No articles found for this category.</p>
          </div>
        ) : (
          <>
            {featured && (
              <section
                className="featured-section"
                aria-label="Featured article"
              >
                <NewsCard article={featured} featured />
              </section>
            )}
            <div className="news-grid">
              {rest.map((article, i) => (
                <NewsCard key={article.url || i} article={article} />
              ))}
            </div>
          </>
        )}

        {!loading && totalPages > 1 && (
          <div className="pagination" role="navigation" aria-label="Pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
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
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

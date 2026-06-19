import React from "react";
import "./NewsCard.css";

const FALLBACK =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function NewsCard({ article, featured = false }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  const img = urlToImage || FALLBACK;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`news-card${featured ? " featured" : ""}`}
      aria-label={`Read article: ${title}`}
    >
      <div className="card-image">
        <img
          src={img}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK;
          }}
        />
        <span className="source-badge">{source?.name || "News"}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {featured && description && <p className="card-desc">{description}</p>}
        <div className="card-meta">
          <span className="meta-time">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {publishedAt ? timeAgo(publishedAt) : ""}
          </span>
          <span className="read-more">Read →</span>
        </div>
      </div>
    </a>
  );
}

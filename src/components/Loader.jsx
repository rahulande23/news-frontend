import React from "react";
import "./Loader.css";

export function CardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div
          className="skeleton-line shimmer"
          style={{ width: "40%", height: "12px" }}
        />
        <div className="skeleton-line shimmer" style={{ width: "100%" }} />
        <div className="skeleton-line shimmer" style={{ width: "85%" }} />
        <div className="skeleton-line shimmer" style={{ width: "60%" }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="news-grid" aria-busy="true" aria-label="Loading articles">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

import React from "react";
import "./CategoryTabs.css";

const CATEGORIES = [
  { id: "", label: "🌍 All" },
  { id: "business", label: "💼 Business" },
  { id: "technology", label: "💻 Technology" },
  { id: "science", label: "🔬 Science" },
  { id: "health", label: "❤️ Health" },
  { id: "sports", label: "⚽ Sports" },
  { id: "entertainment", label: "🎬 Entertainment" },
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="category-tabs" role="tablist" aria-label="News categories">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          className={`tab-btn${active === cat.id ? " active" : ""}`}
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

import React from "react";
import "./TrendingSearches.css";

const defaultItems = [
  "H5N1 Bird Flu",
  "Pneumonia",
  "Diabetes",
  "Milia",
  "Measles",
  "Tuberculosis",
  "Seasonal Flu",
  "Influenza",
];

export default function TrendingSearches({ items = defaultItems, onSelect }) {
  return (
    <section className="container">
      <h2 className="landing-page__title ">Trending Searches</h2>
      <div>
        <div className="ts-list">
          {items.map((item) => (
            <button
              type="button"
              key={item}
              className="ts-pill"
              onClick={() => onSelect?.(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

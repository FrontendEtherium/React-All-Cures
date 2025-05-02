import React, { useEffect, useState } from "react";
import "./TrendingSearches.css";
import axios from "axios";
import { backendHost } from "../../../api-config";

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
  
  const [trending, setTrending] = useState(items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // to avoid state updates after unmount
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendHost}/data/all/trending/categories`
        );
        if (!isMounted) return;

        // assume API returns [{ category: "X" }, …]
        if (Array.isArray(response.data)) {
          const categories = response.data.map((item) => item.category);
          setTrending(categories);
        } else {

          console.warn("Unexpected data shape:", response.data);
        }
      } catch (err) {
        console.error("Error loading trending categories:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); // ← empty deps: run once on mount

  if (error) {
    return (
      <section className="container trending-searches">
        <h2 className="landing-page__title">Trending Searches</h2>
        <p className="ts-error">Failed to load trending searches.</p>
      </section>
    );
  }

  return (
    <section className="container trending-searches">
      <h2 className="landing-page__title">Trending Searches</h2>
      <div className="ts-list">
        {loading ? (
          <p className="ts-loading">Loading…</p>
        ) : (
          trending.map((category) => (
            <button
              key={category}
              type="button"
              className="ts-pill"
              onClick={() => onSelect?.(category)}
            >
              {category}
            </button>
          ))
        )}
      </div>
    </section>
  );
}

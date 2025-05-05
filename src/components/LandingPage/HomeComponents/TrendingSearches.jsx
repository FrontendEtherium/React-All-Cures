import React, { useEffect, useState } from "react";
import "./TrendingSearches.css";
import axios from "axios";
import { backendHost } from "../../../api-config";
import { Link } from "react-router-dom";

export default function TrendingSearches({ items, onSelect }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendHost}/data/all/trending/categories`
        );

        setTrending(data);
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
  }, []);

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
            <Link to={`/searchcategory/disease/${category.dc_id}`}>
              <button
                key={category}
                type="button"
                className="ts-pill"
                onClick={() => onSelect?.(category)}
              >
                {category.category}
              </button>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

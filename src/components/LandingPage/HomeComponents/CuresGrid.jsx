// src/components/CuresGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendHost } from "../../../api-config";
import headers from "../../../api-fetch";
import Heart from "../../../assets/img/heart.png";
import { Link } from "react-router-dom";
import "./CuresGrid.css";
import { imagePath, imageUrl } from "../../../image-path";

const CuresGrid = ({ title = "Cures", blogPage }) => {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          `${backendHost}/article/allkv?limit=5`,
          { headers }
        );
        setItems(data);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!loaded) {
    return (
      <div className="loader my-4">
        <img src={Heart} alt="All Cures Logo" id="heart" />
      </div>
    );
  }

  const displayItems = isMobile ? items.slice(0, 3) : items;

  return (
    <section className="cures-container container">
      <h1 className="landing-page__title">{title}</h1>

      <div className="cures-grid__grid">
        {displayItems.map((item) => {
          let contentObj = { blocks: [] };
          try {
            contentObj = JSON.parse(decodeURIComponent(item.content));
          } catch {}

          const imgLoc = item.content_location || "";
          const hasJson =
            imgLoc.includes("cures_articleimages") && imgLoc.endsWith(".json");

          const imageLoc = hasJson
            ? isMobile
              ? `${imageUrl}/${
                  imgLoc.replace(".json", ".png").split("/webapps/")[1]
                }`
              : `${imageUrl}tr:h-250,w-300/${
                  imgLoc.replace(".json", ".png").split("/webapps/")[1]
                }`
            : "https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-100,w-300,f-webp/cures_articleimages//299/default.png";

          return (
            <div
              key={item.article_id}
              className="cures-grid__item container"
              style={{ backgroundImage: `url(${imageLoc})` }}
            >
              <Link
                to={`/cure/${item.article_id}-${encodeURIComponent(
                  item.title
                )}`}
                className="cures-grid__link"
              >
                <div className="cures-grid__overlay">
                  {/* <h2 className="cures-grid__headline">{item.title}</h2> */}

                  <span className="cures-grid__cta">Read more →</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {blogPage ? (
        ""
      ) : (
        <Link to="allcures">
          <div className="featured-blogs__all">See all {">"} </div>
        </Link>
      )}
    </section>
  );
};

export default CuresGrid;

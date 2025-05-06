import React, { useEffect, useState } from "react";
import UpdatedHeader from "../Header/Header";
import axios from "axios";
import { backendHost } from "../../api-config";
import headers from "../../api-fetch";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./AllBlogs.css";
import SubscriberComponent from "../LandingPage/HomeComponents/SubscriberComponent";
import Footer from "../Footer/Footer";
import { imgKitImagePath } from "../../image-path";
import Heart from "../../assets/img/heart.png";
// Helper: build image URL
const buildImage = (item, height = 250, width = 300) => {
  const imgLoc = item.content_location || "";
  const isCustom =
    imgLoc.includes("cures_articleimages") && imgLoc.endsWith(".json");
  if (isCustom) {
    const path = imgLoc.replace("json", "png").split("/webapps/")[1];
    return `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-${height},w-${width},f-webp/${path}`;
  }
  return `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-${height},w-${width},f-webp/cures_articleimages//299/default.png`;
};

// Helper: extract preview text
const getPreview = (raw) => {
  try {
    const c = JSON.parse(decodeURIComponent(raw || ""));
    return (c.blocks?.[0]?.data?.text || "").slice(0, 60) + "...";
  } catch {
    return "No preview available...";
  }
};

function RecentCures({ items }) {
  const slice = items.slice(0, 7);
  return (
    <section className="recent-cures container">
      <h2 className="landing-page__title">Recent Cures</h2>
      <div className="recent-grid">
        {slice.map((item, idx) => {
          const preview = getPreview(item.content);
          const date = new Date(item.publish_date).toLocaleDateString();
          const cls = ["main", "sec1", "sec2", "sec3", "sec4", "sec5", "sec6"][
            idx
          ];
          const imgLoc = item.content_location || "";
          const hasJson =
            imgLoc.includes("cures_articleimages") && imgLoc.endsWith(".json");
          const bgImage = hasJson
            ? `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-400,w-600,f-webp/${
                imgLoc.replace(".json", ".png").split("/webapps/")[1]
              }`
            : `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-400,w-600,f-webp/cures_articleimages//299/default.png`;

          return (
            <Link
              key={item.id}
              to={`/cure/${item.article_id}-${item.title}`}
              className={`recent-item ${cls}`}
            >
              <div
                className="recent-item__image"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <div className="recent-item__info">
                  <span className="recent-item__meta">
                    {item.authors_name} • {date}
                  </span>
                  <h3 className="recent-item__title">{item.title}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CureGrid({ items, isMobile }) {
  const displayItem = isMobile ? items.slice(0, 6) : items;
  return (
    <section className="cure-grid container">
      <h2 className="landing-page__title">Cures</h2>
      <div className="cure-grid__list">
        {displayItem.map((item) => {
          const imgLoc = item.content_location || "";
          const hasJson =
            imgLoc.includes("cures_articleimages") && imgLoc.endsWith(".json");
          const bgImage = hasJson
            ? `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-400,w-600,f-webp/${
                imgLoc.replace(".json", ".png").split("/webapps/")[1]
              }`
            : `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-400,w-600,f-webp/cures_articleimages//299/default.png`;

          return (
            <div lassName="curesGrid__container">
              <div
                style={{ backgroundImage: `url(${bgImage})` }}
                className="curesGrid__image"
              >
                <div className="cure-card__info">
                  <Link
                    key={item.id}
                    to={`/cure/${item.article_id}-${item.title}`}
                    className="cure-card"
                  >
                    <p className="expert-card__meta">
                      {item.authors_name} · {formatDate(item.publish_date)}
                    </p>
                    <h3 className="cure-card__title">{item.title}</h3>
                    {/* <p className="cure-card__preview">
                      {getPreview(item.content)}
                    </p> */}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="pagination">
        <button className="pag-btn prev">← Previous</button>
        <button className="pag-btn current">1</button>
        <button className="pag-btn">2</button>
        <button className="pag-btn">3</button>
        <span className="pag-ellipsis">…</span>
        <button className="pag-btn next">Next →</button>
      </div> */}
    </section>
  );
}
function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ExpertCard({ item }) {
  const imgLoc = item.content_location || "";
  const hasJson =
    imgLoc.includes("cures_articleimages") && imgLoc.endsWith(".json");
  const bgImage = hasJson
    ? `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-400,w-600,f-webp/${
        imgLoc.replace(".json", ".png").split("/webapps/")[1]
      }`
    : `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-400,w-600,f-webp/cures_articleimages//299/default.png`;

  return (
    <div className="expert-card__container">
      <div
        className="expert-card__image"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Link>
          <img
            src={`${imgKitImagePath}${item.image_location}`}
            alt={item.authors_name}
            className="expert-card__avatar"
          />
        </Link>
        <Link
          to={`/cure/${item.article_id}-${item.title}`}
          className="expert-card"
        >
          <div className="expert-card__info">
            <p className="expert-card__meta">
              {item.authors_name} · {formatDate(item.publish_date)}
            </p>
            <h3 className="expert-card__title">{item.title}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Experts({ experts }) {
  return (
    <section className="experts container">
      <h2 className="landing-page__title">Hear from Our Experts</h2>

      {/* Mobile static grid */}
      <div className="experts__mobile-grid">
        {experts.slice(0, 4).map((e) => (
          <ExpertCard key={e.id} item={e} />
        ))}
      </div>

      {/* Desktop carousel */}
      <div className="experts__desktop-slider">
        <Slider
          infinite={false}
          slidesToShow={4}
          slidesToScroll={1}
          arrows
          dots={false}
          responsive={[
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } },
          ]}
        >
          {experts.map((e) => (
            <ExpertCard key={e.id} item={e} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default function AllBlogs() {
  const [items, setItems] = useState([]);
  const [experts, setExperts] = useState([]);
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
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchArticles() {
      try {
        const [curesRes, expertsRes] = await Promise.all([
          axios.get(`${backendHost}/article/allkv?limit=12`, {
            headers,
            signal,
          }),
          axios.get(`${backendHost}/article/allkvfeatured`, {
            headers,
            signal,
          }),
        ]);

        setItems(curesRes.data);
        setExperts(expertsRes.data);
        setLoaded(true);
      } catch (err) {
        // ignore abort errors
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        console.error("Failed to fetch articles:", err);
      }
    }

    fetchArticles();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="">
      <UpdatedHeader />
      {loaded ? (
        <>
          <RecentCures items={items} isMobile={isMobile} />
          <CureGrid items={items} isMobile={isMobile} />
          <div>
            <img
              src={`${imgKitImagePath}/assets/img/bannersdestopmobiles-01.jpg`}
              alt="Promo Banner"
              className="promo-banner"
            />
          </div>
          <Experts experts={experts} />
          <SubscriberComponent />
        </>
      ) : (
        <div className="loader my-4">
          <img src={Heart} alt="All Cures Logo" id="heart" />
        </div>
      )}

      <Footer />
    </div>
  );
}

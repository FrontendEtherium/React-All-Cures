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

function CureGrid({ items, isMobile, onNext, onPrev, hasPrev }) {
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
            <div className="curesGrid__container">
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
      <div
        className="cure-grid__pagination"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {hasPrev ? (
          <span
            className="cure-grid__prev"
            style={{ cursor: "pointer" }}
            onClick={onPrev}
          >
            ← Previous
          </span>
        ) : (
          <span /> // empty to keep spacing
        )}
        <span
          className="cure-grid__next"
          style={{ cursor: "pointer" }}
          onClick={onNext}
        >
          Next →
        </span>
      </div>
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

function Experts({
  experts,
  isMobile,
  expertPage,
  onPrevExpert,
  onNextExpert,
  hasPrevExpert,
  hasNextExpert,
}) {
  const desktopSettings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
    ],
  };

  const pageSize = 4;
  const start = expertPage * pageSize;
  const mobileSlice = experts.slice(start, start + pageSize);

  return (
    <section className="experts container">
      <h2 className="landing-page__title">Hear from Our Experts</h2>

      {isMobile ? (
        <>
          <div className="experts__mobile-grid">
            {mobileSlice.map((e) => (
              <ExpertCard key={e.id} item={e} />
            ))}
          </div>
          <div className="experts__pagination">
            <button
              onClick={onPrevExpert}
              disabled={!hasPrevExpert}
              className="cure-grid__prev"
            >
              ← Previous
            </button>
            <button
              onClick={onNextExpert}
              disabled={!hasNextExpert}
              className="cure-grid__next"
              style={{ cursor: "pointer" }}
            >
              Next →
            </button>
          </div>
        </>
      ) : (
        <div className="experts__desktop-slider">
          <Slider {...desktopSettings}>
            {experts.map((e) => (
              <ExpertCard key={e.id} item={e} />
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
}

export default function AllBlogs() {
  const [items, setItems] = useState([]);
  const [experts, setExperts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [offset, setOffset] = useState(0);
  const [expertPage, setExpertPage] = useState(0);
  const expertPageSize = 4;
  const totalExpertPages = Math.ceil(experts.length / expertPageSize);
  const limit = isMobile ? 7 : 12;
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
          axios.get(
            `${backendHost}/article/allkv?limit=${limit}&offset=${offset}`,
            { headers, signal }
          ),
          axios.get(`${backendHost}/article/allkvfeatured?limit=24`, {
            headers,
            signal,
          }),
        ]);

        setItems(curesRes.data);
        setExperts(expertsRes.data);
        setLoaded(true);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        console.error("Failed to fetch articles:", err);
      }
    }

    fetchArticles();
    return () => controller.abort();
  }, [offset, isMobile]);
  const handleNext = () => setOffset((prev) => prev + limit);
  const handlePrev = () => setOffset((prev) => Math.max(prev - limit, 0));
  const handleNextExpert = () =>
    setExpertPage((p) => Math.min(p + 1, totalExpertPages - 1));
  const handlePrevExpert = () => setExpertPage((p) => Math.max(p - 1, 0));
  const hasPrevExpert = expertPage > 0;
  const hasNextExpert = expertPage < totalExpertPages - 1;
  return (
    <div className="">
      <UpdatedHeader />
      {loaded ? (
        <>
          <RecentCures items={items} isMobile={isMobile} />
          <CureGrid
            items={items}
            isMobile={isMobile}
            onNext={handleNext}
            onPrev={handlePrev}
            hasPrev={offset > 0}
          />
          <div>
            <img
              src={`${imgKitImagePath}/assets/img/bannersdestopmobiles-01.jpg`}
              alt="Promo Banner"
              className="promo-banner"
            />
          </div>
          <Experts
            experts={experts}
            isMobile={isMobile}
            expertPage={expertPage}
            onNextExpert={handleNextExpert}
            onPrevExpert={handlePrevExpert}
            hasPrevExpert={hasPrevExpert}
            hasNextExpert={hasNextExpert}
          />
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

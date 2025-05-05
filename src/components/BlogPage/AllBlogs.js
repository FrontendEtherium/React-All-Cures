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
  const slice = items.slice(0, 5);
  return (
    <section className="recent-cures">
      <h2 className="section-title">Recent Cures</h2>
      <div className="recent-grid">
        {slice.map((item, idx) => {
          const preview = getPreview(item.content);
          const date = new Date(item.publish_date).toLocaleDateString();
          const cls = ["main", "sec1", "sec2", "sec3", "sec4"][idx];
          return (
            <Link
              key={item.id}
              to={`/cure/${item.article_id}-${item.title}`}
              className={`recent-item ${cls}`}
            >
              <div className="recent-item__image">
                <img
                  src={buildImage(item, 400, 600)}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <div className="recent-item__info">
                <span className="recent-item__meta">
                  {item.authors_name} • {date}
                </span>
                <h3 className="recent-item__title">{item.title}</h3>
                <p className="recent-item__preview">{preview}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CureGrid({ items }) {
  return (
    <section className="cure-grid">
      <h2 className="section-title">Cures</h2>
      <div className="cure-grid__list">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/cure/${item.article_id}-${item.title}`}
            className="cure-card"
          >
            <div className="cure-card__image">
              <img src={buildImage(item)} alt={item.title} loading="lazy" />
            </div>
            <div className="cure-card__info">
              <h3 className="cure-card__title">{item.title}</h3>
              <p className="cure-card__preview">{getPreview(item.content)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button className="pag-btn prev">← Previous</button>
        <button className="pag-btn current">1</button>
        <button className="pag-btn">2</button>
        <button className="pag-btn">3</button>
        <span className="pag-ellipsis">…</span>
        <button className="pag-btn next">Next →</button>
      </div>
    </section>
  );
}

function ExpertCard({ item }) {
  return (
    <Link to={`/cure/${item.article_id}-${item.title}`} className="expert-card">
      <div className="expert-card__image">
        <img
          src={buildImage(item, 250, 300)}
          alt={item.title}
          className="expert-card__main-img"
          loading="lazy"
        />
        <img
          src={item.image_location}
          alt={item.authors_name}
          className="expert-card__avatar"
        />
      </div>
      <div className="expert-card__info">
        <h3 className="expert-card__title">{item.title}</h3>
        <h6 className="expert-card__author">{item.authors_name}</h6>
        <p className="expert-card__preview">{getPreview(item.content)}</p>
      </div>
    </Link>
  );
}

function Experts({ experts }) {
  return (
    <section className="experts">
      <h2 className="section-title">Hear from Our Experts</h2>

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
          dots
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

  useEffect(() => {
    // Fetch general articles (Cures)
    axios
      .get(`${backendHost}/article/allkv?limit=12`, { headers })
      .then((res) => setItems(res.data))
      .catch(console.error);

    // Fetch featured articles (Experts)
    axios
      .get(`${backendHost}/article/allkvfeatured`, { headers })
      .then((res) => setExperts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="allblogs">
      <UpdatedHeader />
      <RecentCures items={items} />
      <CureGrid items={items} />
      <Experts experts={experts} />
      <SubscriberComponent />
      <Footer/>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { backendHost } from "../../../api-config";
import headers from "../../../api-fetch";
import axios from "axios";
import Heart from "../../../assets/img/heart.png";
import "./FeaturedBlogs.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRightIcon fontSize="large" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronLeftIcon fontSize="large" />
    </div>
  );
};

function FeaturedBlogs({ isMobile }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);


  const carouselSettings = {
    infinite: true, // Loop through slides

    slidesToShow: 4, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll
    autoplay: false, // Auto-scroll
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Adjust for mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `${backendHost}/article/allkv?limit=9`,
          { headers }
        );
        setItems(data);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
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
    <section className="container">
      <h1 className="landing-page__title">Featured Blogs</h1>
      {!isMobile ? (
        <Slider {...carouselSettings}>
          {displayItems.map((item) => {
            let contentObj;
            try {
              contentObj = JSON.parse(decodeURIComponent(item.content || ""));
            } catch {
              contentObj = null;
            }

            // Build image URL
            const imgLoc = item.content_location || "";
            const hasCustom =
              imgLoc.includes("cures_articleimages") &&
              imgLoc.endsWith(".json");
            const imageLoc = hasCustom
              ? `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-250,w-300,f-webp/${
                  imgLoc.replace("json", "png").split("/webapps/")[1]
                }`
              : "https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-250,w-300,f-webp/cures_articleimages//299/default.png";

            // Preview text
            const previewText =
              contentObj?.blocks?.[0]?.data?.text?.slice(0, 50) ||
              "No preview available.";

            return (
              <div key={item.id} className="featured-blogs__item">
                <div className="featured-blogs__image">
                  <img src={imageLoc} alt={item.title} loading="lazy" />
                </div>
                <Link to={`/cure/${item.article_id}-${item.title}`}>
                  <div className="featured-blogs__content">
                    <h2 className="featured-blogs__headline">{item.title}</h2>
                    <p className="featured-blogs__paragraph">
                      {previewText}...
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      ) : (
        <>
          {displayItems.map((item) => {
            let contentObj;
            try {
              contentObj = JSON.parse(decodeURIComponent(item.content || ""));
            } catch {
              contentObj = null;
            }

            // Build image URL
            const imgLoc = item.content_location || "";
            const hasCustom =
              imgLoc.includes("cures_articleimages") &&
              imgLoc.endsWith(".json");
            const imageLoc = hasCustom
              ? `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-250,w-300,f-webp/${
                  imgLoc.replace("json", "png").split("/webapps/")[1]
                }`
              : "https://ik.imagekit.io/qi0xxmh2w/productimages/tr:h-250,w-300,f-webp/cures_articleimages//299/default.png";

            // Preview text
            const previewText =
              contentObj?.blocks?.[0]?.data?.text?.slice(0, 50) ||
              "No preview available.";

            return (
              <div key={item.id} className="featured-blogs__item">
                <div className="featured-blogs__image">
                  <img src={imageLoc} alt={item.title} loading="lazy" />
                </div>
                <Link to={`/cure/${item.article_id}-${item.title}`}>
                  <div className="featured-blogs__content">
                    <h2 className="featured-blogs__headline">{item.title}</h2>
                    <p className="featured-blogs__paragraph">
                      {previewText}...
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      )}

      <div className="featured-blogs__all">See all {">"} </div>
    </section>
  );
}

export default FeaturedBlogs;

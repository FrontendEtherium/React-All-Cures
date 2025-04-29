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
import "./DoctorCures.css";
import { imgKitImagePath } from "../../../image-path";
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

function DoctorCures() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const carouselSettings = {
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll
    autoplay: false, // Auto-scroll
    autoplaySpeed: 3000, // Auto-scroll interval

    pauseOnFocus: true,

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
          `${backendHost}/article/allkvfeatured`,
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      <h1 className="landing-page__title">Hear from Our Experts</h1>
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
              <div key={item.id} className="doctor-cures__item">
                <div className="doctor-cures__image">
                  <img src={imageLoc} alt={item.title} loading="lazy" className="doctor-cures_articleImg" />

                  <img
                    src={` ${imgKitImagePath}${item.image_location}`}
                    alt="Doctor"
                    className="doctor-cures_docImg"
                  />
                </div>
                <Link to={`/cure/${item.article_id}-${item.title}`}>
                  <div className="doctor-cures__content">
                    <h2 className="doctor-cures__headline">{item.title}</h2>
                    <h6>{item.authors_name}</h6>
                    <p className="doctor-cures__paragraph">{previewText}...</p>
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
              <div key={item.id} className="doctor-cures__item">
                <div className="doctor-cures__image">
                  <img src={imageLoc} alt={item.title} loading="lazy" />
                  <img
                    src={` ${imgKitImagePath}${item.image_location}`}
                    alt="Doctor"
                    className="doctor-cures_docImg"
                  />
                </div>
                <Link to={`/cure/${item.article_id}-${item.title}`}>
                  <div className="doctor-cures__content">
                    <h2 className="doctor-cures__headline">{item.title}</h2>
                    <p className="doctor-cures__paragraph">{previewText}...</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      )}

      <div className="doctor-cures__all">See all {">"} </div>
    </section>
  );
}

export default DoctorCures;

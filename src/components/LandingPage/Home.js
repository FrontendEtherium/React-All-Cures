import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";

import { imgKitImagePath } from "../../image-path";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";

import UpdatedHeader from "../Header/Header";
import TrendingSearches from "./HomeComponents/TrendingSearches";
import FeaturedBlogs from "./HomeComponents/FeaturedBlogs";
import TrendingCures from "./HomeComponents/TrendingCures";
import DoctorCures from "./HomeComponents/DoctorCures";
import TrustPartnerSection from "./HomeComponents/TrustPartnerSection";
import CuresGrid from "./HomeComponents/CuresGrid";
import OurExpert from "./HomeComponents/OurExpert";
import ExpertAdviceComponent from "./HomeComponents/ExpertAdviceComponent";
import SubscriberComponent from "./HomeComponents/SubscriberComponent";
import Footer from "../Footer/Footer";

import "../../assets/healthcare/css/main.css";
import "../../assets/healthcare/css/responsive.css";
import "../../assets/healthcare/css/animate.css";
import "../../assets/healthcare/icomoon/style.css";
import "./custom.css";
import "./Home.css";

function Home() {
  const carouselImages = [
    `${imgKitImagePath}/assets/img/HomePage1.jpg`,
    `${imgKitImagePath}/assets/img/HomePage2.jpg`,
  ];

  const [ads, setAds] = useState("");
  const [adId, setAdId] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          `${backendHost}/sponsored/list/ads/url/1`
        );
        if (response.data !== "All Ads are Served") {
          const idSegment = response.data.split("/")[3];
          const match = idSegment.match(/\d+/);
          if (match) setAdId(match[0]);
        }
        setAds(`https://all-cures.com:444${response.data}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAds();
  }, []);

  const handleAdClick = () => {
    axios.put(`${backendHost}/sponsored/ads/clicks/${adId}`);
  };

  const clickCounter = async () => {
    try {
      const uid = userId || 0;
      await axios.post(`${backendHost}/video/consult/counts/${uid}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <UpdatedHeader />

      <div className="doctor-patient-banner-container">
        <Carousel interval={4000} pause={false} indicators>
          {carouselImages.map((img, idx) => (
            <Carousel.Item key={idx}>
              {idx === 1 ? (
                <img
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  className="img-fluid rounded doctor-patient-banner"
                />
              ) : (
                <a href="#trends">
                  <img
                    src={img}
                    alt={`Banner ${idx + 1}`}
                    className="img-fluid rounded doctor-patient-banner"
                  />
                </a>
              )}

              {idx === 1 && (
                <Carousel.Caption>
                  <button
                    className="doctor-patient-banner-btn"
                    onClick={() => {
                      window.location.href = "/doctor";
                      clickCounter();
                    }}
                  >
                    Consult Now
                  </button>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {ads && ads !== "https://all-cures.com:444All Ads are Served" && (
        <div className="container d-flex justify-content-center">
          <img
            id="left-menu-ad"
            className="mb-5 ml-1"
            src={ads}
            alt="Advertisement"
            onClick={handleAdClick}
          />
        </div>
      )}

      <TrendingSearches />
      <FeaturedBlogs />

      <div className="container">
        <img
          src={`${imgKitImagePath}/assets/img/bannersdestop-mobiles-06.jpg`}
          alt="Promo Banner"
          className="container"
        />
      </div>

      <TrendingCures />

      <div className="container">
        <img
          src={`${imgKitImagePath}/assets/img/bannersdestopmobiles-01.jpg`}
          alt="Promo Banner"
          className="container"
        />
      </div>

      <DoctorCures />
      <TrustPartnerSection />
      <CuresGrid />
      <OurExpert />
      <ExpertAdviceComponent />

      <div className="container">
        <img
          src={`${imgKitImagePath}/assets/img/bannersdestopmobiles-01.jpg`}
          alt="Promo Banner"
          className="container"
        />
      </div>

      <SubscriberComponent />
      <Footer />
    </div>
  );
}

export default Home;

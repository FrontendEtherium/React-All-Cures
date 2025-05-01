import React, { useState, useEffect } from "react";
import { imgKitImagePath } from "../../image-path";
import Header from "../Header/Header";
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
import HomePageCarousel from "./HomeComponents/HomePageCarousel";

function Home() {
  // const [ads, setAds] = useState("");
  // const [adId, setAdId] = useState("");

  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${backendHost}/sponsored/list/ads/url/1`
  //       );
  //       if (response.data !== "All Ads are Served") {
  //         const idSegment = response.data.split("/")[3];
  //         const match = idSegment.match(/\d+/);
  //         if (match) setAdId(match[0]);
  //       }
  //       setAds(`https://all-cures.com:444${response.data}`);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchAds();
  // }, []);

  // const handleAdClick = () => {
  //   axios.put(`${backendHost}/sponsored/ads/clicks/${adId}`);
  // };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Header />
      <HomePageCarousel />

      {/* {ads && ads !== "https://all-cures.com:444All Ads are Served" && (
        <div className="container d-flex justify-content-center">
          <img
            id="left-menu-ad"
            className="mb-5 ml-1"
            src={ads}
            alt="Advertisement"
            onClick={handleAdClick}
          />
        </div>
      )} */}

      <TrendingSearches isMobile={isMobile} />
      <FeaturedBlogs isMobile={isMobile} />

      <div className="">
        <img
          src={`${imgKitImagePath}/assets/img/bannersdestop-mobiles-06.jpg`}
          alt="Promo Banner"
          className="promo-banner"
        />
      </div>

      <TrendingCures isMobile={isMobile} />

      <div className="">
        <img
          src={`${imgKitImagePath}/assets/img/bannersdestopmobiles-01.jpg`}
          alt="Promo Banner"
          className="promo-banner"
        />
      </div>

      <DoctorCures />
      <TrustPartnerSection />
      <CuresGrid />
      <OurExpert />
      {/* <ExpertAdviceComponent /> */}

      <div>
        <img
          src={`${imgKitImagePath}/assets/img/bannersdestopmobiles-01.jpg`}
          alt="Promo Banner"
          className="promo-banner"
        />
      </div>

      <SubscriberComponent />
      <Footer />
    </div>
  );
}

export default Home;

import React from "react";
import "./TrendingCures.css";
import { imgKitImagePath } from "../../../image-path";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TrendingCures() {
  const CuresData = [
    { title: "Ayurveda", medicineType: 1, img: "ayurveda04.png" },
    { title: "Chinese", medicineType: 4, img: "Chinese04.png" },
    { title: "Homeopathy", medicineType: 8, img: "Homopathy04.png" },
    { title: "Unani", medicineType: 2, img: "Unani04.png" },
    { title: "Japanese", medicineType: 6, img: "Japanese04.png" },
    { title: "Naturopathy", medicineType: 9, img: "Naturpathy04.png" },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="landing-page__title">Trending Cures</h1>
      <Slider {...sliderSettings} className="trending-cures__slider">
        {CuresData.map((cure) => (
          <div key={cure.medicineType} className="trending-cures__card">
            <Link to={`/searchmedicine/medicinetype/${cure.medicineType}`}>
              <img
                src={`${imgKitImagePath}/assets/img/${cure.img}`}
                alt={`${cure.title}`}
                className="trending-cures__image"
              />
              <div className="trending-cures__heading">{cure.title}</div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TrendingCures;

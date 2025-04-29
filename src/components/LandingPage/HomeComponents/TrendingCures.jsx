import React from "react";
import "./TrendingCures.css";
import { imgKitImagePath } from "../../../image-path";
import { Link } from "react-router-dom";
function TrendingCures() {
  const CuresData = [
    { title: "Ayurveda", medicineType: 1, img: "ayurveda04.png" },
    { title: "Chinese", medicineType: 4, img: "Chinese04.png" },
    { title: "Homeopathy", medicineType: 8, img: "Homopathy04.png" },
    { title: "Unani", medicineType: 2, img: "Unani04.png" },
    { title: "Japanese", medicineType: 6, img: "Japanese04.png" },
    { title: "Naturopathy", medicineType: 9, img: "Naturpathy04.png" },
  ];
  return (
    <div className="container">
      <h1 className="landing-page__title">Trending Cures</h1>
      <div className="trending-cures__card">
        {CuresData.map((cure) => {
          return (
            <div>
              <Link to={`/searchmedicine/medicinetype/${cure.medicineType}`}>
                <img
                  src={`${imgKitImagePath}/assets/img/${cure.img}`}
                  alt={`${cure.title}`}
                  className="trending-cures__image"
                />
                <div className="trending-cures__heading">{cure.title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingCures;

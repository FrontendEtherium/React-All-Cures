import React from "react";
import { Carousel } from "react-bootstrap";
import { backendHost } from "../../../api-config";
import { userId } from "../../UserId";
import axios from "axios";
import { imgKitImagePath } from "../../../image-path";
import "./HomePageCarousel.css"
function HomePageCarousel() {
  const carouselImages = [
    `${imgKitImagePath}/assets/img/HomePage1.jpg`,
    `${imgKitImagePath}/assets/img/HomePage2.jpg`,
  ];
  const clickCounter = async () => {
    try {
      const uid = userId || 0;
      await axios.post(`${backendHost}/video/consult/counts/${uid}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="doctor-patient-banner-container">
      <Carousel interval={4000} pause={false} >
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
  );
}

export default HomePageCarousel;

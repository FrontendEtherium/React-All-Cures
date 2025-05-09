import React, { useEffect, useState } from "react";
import { backendHost } from "../../../api-config";
import axios from "axios";
import "./OurExpert.css";
import { Link } from "react-router-dom";
import Heart from "../../../assets/img/heart.png";
import Slider from "react-slick"; // Import react-slick
import { userAccess } from "../../UserAccess";
import Test from "../test";

// Slick carousel settings
const carouselSettings = {
  infinite: true, // Loop through slides
  speed: 700, // Transition speed
  slidesToShow: 5, // Number of cards to show at once
  slidesToScroll: 1, // Number of cards to scroll
  autoplay: false, // Auto-scroll
  autoplaySpeed: 3000, // Auto-scroll interval
  arrows: true,
  pauseOnFocus: true,

  responsive: [
    {
      breakpoint: 1024, // Adjust for smaller screens
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600, // Adjust for mobile
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

function OurExpert({ isMobile }) {
  const [docData, setDocData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors=901,903,905,872,907,923,873,894,885,874,941`
        );

        setDocData(data.map.DoctorDetails.myArrayList);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctor();
  }, []);

  if (!loaded) {
    return (
      <div className="loader my-4">
        <img src={Heart} alt="All Cures Logo" id="heart" />
      </div>
    );
  }
  const handleBookAppointment = (videoService, docID) => {
    if (!userAccess) {
      setModalShow(true);
    }
    if (videoService === 1) {
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="landing-page__title">Meet Our Experts</h1>
        <Slider {...carouselSettings}>
          {docData.map((doc) => (
            <div key={doc.map.docID} className="our-expert_card_container">
              <Link
                to={`/doctor/${doc.map.docID}-${doc.map.firstName}-${doc.map.lastName}`}
                className=""
                id=""
              >
                {doc.map.imgLoc ? (
                  <img
                    src={`https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-180,h-220,f-webp${doc.map.imgLoc}`}
                    className="our-expert_image"
                    loading="lazy"
                    alt={`${doc.map?.prefix} ${doc.map.firstName} ${doc.map.lastName}`}
                  />
                ) : (
                  <div className="our-expert_image"></div>
                )}
                <h2 className="our-expert_heading">
                  {doc.map?.prefix} {doc.map.firstName} {doc.map.lastName}
                </h2>
                <h5 className="our-expert_sub_heading">
                  {doc.map?.medicineType}{doc.map?.hospitalAffliated}
               
                </h5>
                <h5  className="our-expert_sub_heading1 ">   {`${doc.map?.degDesc}`}</h5>

                <div
                  className="our-expert__button"
                  onClick={() =>
                    handleBookAppointment(doc.map?.videoService, doc.map?.docID)
                  }
                >
                  Book an appointment
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <Test show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default OurExpert;

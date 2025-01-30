import React from "react";
import Header from "../Header/Header";
import "./DoctorConnect.css";
import Medicine from "../../assets/img/doctorLandingMain.png";
import FeaturedArticles from "./FeaturedArticles";
import DoctorsArticles from "./DoctorConnectComponents/DoctorsArticles";
import ValuesSection from "./DoctorConnectComponents/ValuesSection";
import Footer from "../Footer/Footer";

const medicineIcons = {
  Ayurveda: "../../assets/icons/ayurveda.png",
  Homeopathy: "../../assets/icons/homeopathy.png",
  Allopathy: "../../assets/icons/allopathy.png",
  Naturopathy: "../../assets/icons/naturopathy.png",
  Unani: "../../assets/icons/unani.png",
  Siddha: "../../assets/icons/siddha.png",
};

function DoctorLandingPage() {
  const fields = [
    { title: "Ayurveda" },
    { title: "Homeopathy" },
    { title: "Persian" },
    { title: "Naturopathy" },
    { title: "Unani" },
    { title: "Siddha" },
  ];

  return (
    <>
      <Header showSearch={false} />
      <main className="background-screen">
        <section className="upper-section-container">
          <h2 className="upper-section-container-text">
            Discover Harmony and Healing through our various systems of medicine
          </h2>
          <img
            src={Medicine}
            alt="All-cures Medicine"
            className="upper-section-container-text-image"
          />
        </section>

        <section className="medicine-doc-container">
          <div className="medicine-doc-container-upper">
            <div>
              <h2 className="medicine-doc-container-upper-text-heading">
                Consult Top Doctors Online for Any Health Concern
              </h2>
              <p className="medicine-doc-container-upper-text-subHeading">
                Video and Chat consultations with verified doctors in all
                specialties
              </p>
            </div>
            <button
              className="medicine-doc-button"
              aria-label="View all doctors"
            >
              <span className="medicine-doc-button-heading">
                View all Types
              </span>
            </button>
          </div>

          <div className="medicine-types-container">
            {fields.map((field, index) => (
              <div key={index} className="medicine-type-card">
                <img
                  src={medicineIcons[field.title]}
                  alt={field.title}
                  className="medicine-icon"
                />
                <h3 className="medicine-type-title">{field.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 mt-2 " style={{height:'550px'}}>
          <div className="container" id="trends">
            <div className="row">
              <div className="comman-heading">
                <div className="h4">
               
                  Read top articles from our health experts
                </div>
              </div>
            </div>
            <div className="row">
              <DoctorsArticles />
            </div>
          </div>
        </section>
        <section>
          <ValuesSection/>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default DoctorLandingPage;

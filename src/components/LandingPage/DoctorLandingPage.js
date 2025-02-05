import React from "react";
import Header from "../Header/Header";
import "./DoctorConnect.css";
import Medicine from "../../assets/img/doctorLandingMain.png";
import FeaturedArticles from "./FeaturedArticles";
import DoctorsArticles from "./DoctorConnectComponents/DoctorsArticles";
import ValuesSection from "./DoctorConnectComponents/ValuesSection";
import Footer from "../Footer/Footer";
import DoctorByMedicineType from "./DoctorConnectComponents/DoctorByMedicineType";

function DoctorLandingPage() {
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

        <DoctorByMedicineType />
        <ValuesSection />
        <section className="mb-64 mt-10 " style={{ height: "650px" }}>
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
      </main>
      <Footer />
    </>
  );
}

export default DoctorLandingPage;

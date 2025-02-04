import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import DocBanner from "../../assets/img/DocBanner.png";
import { backendHost } from "../../api-config";
import Check from "../../assets/icon/check.svg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DoctorConnectCard from "./DoctorConnectComponents/DoctorConnectCard";
import DoctorConnectSearch from "./DoctorConnectComponents/DoctorConnectSearch";
import Footer from "../Footer/Footer";
import "./DoctorConnect.css";
import { imgKitImagePath } from "../../image-path";

function DoctorConnect() {
  const [docList, setDocList] = useState([]);
  const totalPages = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchData();
    scrollToTop();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${backendHost}/video/get/doctors/list?offset=${(currentPage - 1) * 10}`
      );
      const json = await response.json();
      const filtered = json.slice(0, 10);
      setDocList(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          aria-current={currentPage === i ? "page" : undefined}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <Header showSearch={false} />
      <div className="doctor-connect-container">
        <div className="doctor-connect-content">
          <img
            src={`${imgKitImagePath}/assets/img/docchart.jpg`}
            alt="Doctor Connect Banner"
            className="doc-banner"
          />
          <div className="doc-text-container">
            <div className="doc-text-item">
              <img src={Check} alt="check" />
              <div>
                Book appointments with minimum wait-time & verified doctor
                details
              </div>
            </div>
          </div>

          <div className="doc-grid">
            {/* Doctor List Section */}
            <div className="doc-list-section">
              {docList.map((doc) => (
                <DoctorConnectCard key={doc.id} doc={doc} />
              ))}

              <nav className="pagination-container" aria-label="Pagination">
                <button
                  type="button"
                  className="pagination-button"
                  aria-label="Previous"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <ChevronLeftIcon />
                </button>
                {renderPageButtons()}
                <button
                  type="button"
                  className="pagination-button"
                  aria-label="Next"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <NavigateNextIcon />
                </button>
              </nav>
            </div>

            {/* Search Section */}
            <div className="doc-search-section">
              <DoctorConnectSearch />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DoctorConnect;

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom"; // React Router v5
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
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory(); // React Router v5
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedTitle = queryParams.get("title");
  const [selectedSpeciality, setSelectedSpeciality] = useState(selectedTitle);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchData();
    scrollToTop();
  }, [currentPage, selectedSpeciality]);

  useEffect(() => {
    // Update URL when selectedSpeciality changes
    if (selectedSpeciality) {
      history.push(`?title=${selectedSpeciality}`);
    } else {
      history.push(`/doctor-connect`); // Default route if no specialty selected
    }
  }, [selectedSpeciality, history]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${backendHost}/video/get/doctors?offset=${
          (currentPage - 1) * 10
        }&medTypeID=${selectedSpeciality}`
      );
      const json = await response.json();
      setDocList(json.data);
      setTotalPages(json.totalPagesCount.totalPages);
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

  const changeSpeciality = (item) => {
    setSelectedSpeciality(item);
  };

  return (
    <>
      <Header showSearch={false} />
      <div className="doctor-connect-container">
        <div className="doctor-connect-content">
          <img
            src={`${imgKitImagePath}/assets/img/docchartdp.jpg`}
            alt="Doctor Connect Banner"
            className="doc-banner"
          />
          <div className="doc-search-section">
            <DoctorConnectSearch
              speciality={selectedSpeciality}
              changeSpeciality={(item) => changeSpeciality(item)}
            />
          </div>
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DoctorConnect;

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
import Test from "./test";
import { fas } from "@fortawesome/free-solid-svg-icons";
function DoctorConnect() {
  const [docList, setDocList] = useState([]);
  const totalPages = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };
  useEffect(() => {
    fetchData();
    scrollToTop();
  }, [currentPage]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${backendHost}/video/get/doctors/list?offset= ${
          (currentPage - 1) * 10
        }`
      );
      const json = await response.json();
      console.log(json);
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
          className={`tw-min-h-[38px] tw-min-w-[38px] tw-flex tw-justify-center tw-items-center tw-py-2 tw-px-3 tw-text-sm tw-rounded-lg tw-focus:outline-none tw-focus:bg-gray-100 ${
            currentPage === i
              ? "tw-bg-primary tw-text-white tw-font-bold "
              : "dark:text-white tw-dark:hover:bg-white/10 tw-dark:focus:bg-white/10  tw-bg-gray-100 tw-text-gray-800 "
          }`}
          aria-current={currentPage === i ? "page" : undefined}
          onClick={() => {
            setCurrentPage(i);
          }}
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
      <div className="tw-scope tw-min-h-screen tw-flex tw-flex-col">
        <div className="tw-flex-grow">
          <div className="tw-flex tw-items-center tw-flex-col">
            <img
              src={DocBanner}
              alt="Doctor Connect Banner"
              className="tw-w-3/4 tw-h-80 md:tw-h-40 tw-object-stretch"
            />
            <div className="tw-flex md:tw-w-5/6 tw-flex-col tw-mt-2 tw-text-base">
              <div className="tw-flex tw-flex-row tw-space-x-2 tw-px-4 tw-text-sm tw-mt-2">
                <img src={Check} alt="check" className="tw-mr-1" />
                <div>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </div>
              </div>
              <div className="tw-grid md:tw-grid-cols-3 tw-gap-6 md:tw-px-4 tw-py-2">
                {/* Doctor List Section */}
                <div className="tw-col-span-2">
                  {docList.map((doc) => (
                    <DoctorConnectCard key={doc.id} doc={doc} />
                  ))}

                  <nav
                    className="tw-flex tw-items-center tw-gap-x-1 tw-self-center  tw-justify-center "
                    aria-label="Pagination"
                  >
                    <div className=" tw-flex  tw-self-center">
                      <button
                        type="button"
                        className="tw-min-h-[38px] tw-min-w-[38px] tw-py-2 tw-px-2.5 tw-inline-flex tw-justify-center tw-items-center tw-gap-x-1.5 tw-text-sm tw-rounded-lg tw-text-gray-800 tw-hover:bg-gray-100 tw-focus:outline-none tw-focus:bg-gray-100 tw-disabled:opacity-50 tw-disabled:pointer-events-none tw-dark:text-white tw-dark:hover:bg-white/10 tw-dark:focus:bg-white/10"
                        aria-label="Previous"
                        disabled={currentPage === 1}
                      >
                        <ChevronLeftIcon />
                      </button>
                      <div className="tw-flex tw-items-center tw-gap-x-1">
                        {renderPageButtons()}
                      </div>
                      <button
                        type="button"
                        className="tw-min-h-[38px] tw-min-w-[38px] tw-py-2 tw-px-2.5 tw-inline-flex tw-justify-center tw-items-center tw-gap-x-1.5 tw-text-sm tw-rounded-lg tw-text-gray-800 tw-hover:bg-gray-100 tw-focus:outline-none tw-focus:bg-gray-100 tw-disabled:opacity-50 tw-disabled:pointer-events-none tw-dark:text-white tw-dark:hover:bg-white/10 tw-dark:focus:bg-white/10"
                        aria-label="Next"
                        disabled={currentPage === totalPages}
                      >
                        <NavigateNextIcon />
                      </button>
                    </div>
                  </nav>
                </div>

                {/* Search Section */}
                <div className="tw-rounded-lg">
                  <DoctorConnectSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DoctorConnect;

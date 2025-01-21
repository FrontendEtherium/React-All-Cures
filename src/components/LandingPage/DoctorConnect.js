import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import DocBanner from "../../assets/img/DocBanner.png";
import { backendHost } from "../../api-config";
import Check from "../../assets/icon/check.svg";

import DoctorSearch from "../Header/DoctorSearch";

import DoctorConnectCard from "./DoctorConnectComponents/DoctorConnectCard";
import DoctorConnectSearch from "./DoctorConnectComponents/DoctorConnectSearch";
import Footer from "../Footer/Footer";
function DoctorConnect() {
  const [docList, setDocList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${backendHost}/video/get/doctors/list`);
      const json = await response.json();
      console.log(json);

      setDocList(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Header showSearch={false} />
      <div className="tw-scope tw-h-screen  ">
        {/* <Header showSearch={false} /> */}

        <div className=" tw-flex tw-items-center tw-flex-col tw-h-screen tw-bg-slate-100 ">
          <img
            src={DocBanner}
            alt="Doctor Connect Banner"
            className="tw-w-1/2 tw-h-72 md:tw-h-40 tw-object-stretch"
          />
          <div className="tw-flex md:tw-w-5/6 tw-flex-col tw-mt-2 tw-text-base ">
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
                  <DoctorConnectCard doc={doc} />
                ))}
              </div>

              {/* Search Section */}
              <div className="tw-rounded-lg tw-shadow-md tw-bg-white">
                <DoctorConnectSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorConnect;

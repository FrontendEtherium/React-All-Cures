import React, { useState } from "react";
import DocBelow from "../../../assets/img/docSearchBelow.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function DoctorConnectSearch({ doctors }) {
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // Handle search by name
  const handleSearchByName = () => {
    window.location.href = `/searchName/${searchName}`;
  };

  // Handle search by city
  const handleSearchByCity = () => {
    window.location.href = `/search/${searchCity}`;
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-max-w-3xl tw-mx-auto">
      {/* Search Heading */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-items-center tw-gap-6 tw-pb-6">
        {/* Text Section */}
        <div className="tw-col-span-2 tw-text-center md:tw-text-left tw-text-2xl tw-font-bold tw-text-gray-900">
          <p className="tw-text-sm tw-text-gray-600 tw-mt-2 tw-text-center">
            Search from our wide range of{" "}
            <span className=" tw-text-lg tw-text-primary">Doctors</span> across
            various specialties and cities.
          </p>
        </div>

        {/* Image Section */}
        <img
          src={DocBelow}
          alt="Doctor"
          className="tw-h-36 tw-justify-self-center md:tw-justify-self-end"
        />
      </div>

      {/* Search Inputs */}
      <div className="tw-space-y-6">
        {/* Search by Name */}
        <div className="tw-flex tw-flex-col">
          <label className="tw-text-xs tw-font-bold tw-text-gray-700 tw-mb-2">
            Search Doctor By Name
          </label>
          <div className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-gray-300 tw-rounded tw-shadow-sm focus-within:tw-border-primary focus-within:tw-ring-2 focus-within:tw-ring-primary">
            <div className="tw-px-3 tw-text-gray-500">
              <PersonIcon />
            </div>
            <input
              type="text"
              placeholder="Enter doctor's name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="tw-py-2 tw-px-2 tw-border-none focus:tw-outline-none tw-flex-grow tw-text-xs"
            />
            <button
              onClick={handleSearchByName}
              disabled={searchName.length < 3}
              className={`tw-py-2 tw-px-2 tw-m-1  tw-shadow-md ${
                searchName.length >= 3
                  ? "tw-bg-primary tw-text-white hover:tw-bg-primary-dark"
                  : "tw-bg-gray-300 tw-text-gray-500"
              }`}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Search by City */}
        <div className="tw-flex tw-flex-col">
          <label className="tw-text-xs tw-font-bold tw-text-gray-700 tw-mb-2">
            Search Doctor By City
          </label>
          <div className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-gray-300 tw-rounded tw-shadow-sm focus-within:tw-border-primary focus-within:tw-ring-2 focus-within:tw-ring-primary">
            <div className="tw-px-3 tw-text-gray-500">
              <LocationOnIcon />
            </div>
            <input
              type="text"
              placeholder="Enter city name"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="tw-py-2 tw-px-2 tw-border-none focus:tw-outline-none tw-flex-grow tw-text-xs"
            />
            <button
              onClick={handleSearchByCity}
              disabled={searchCity.length < 3}
              className={`tw-py-2 tw-px-2 tw-m-1  tw-shadow-md ${
                searchName.length >= 3
                  ? "tw-bg-primary tw-text-white hover:tw-bg-primary-dark"
                  : "tw-bg-gray-300 tw-text-gray-500"
              }`}
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorConnectSearch;

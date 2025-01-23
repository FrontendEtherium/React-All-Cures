import React, { useState } from "react";
import DocBelow from "../../../assets/img/docSearchBelow.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./DoctorConnectSearch.css";

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
    <div className="search-container">
      {/* Search Heading */}
      <div className="search-heading">
        {/* Text Section */}
        <div className="search-text">
          <p className="search-subtext">
            Search from our wide range of <span> Doctors </span> across various
            specialties and cities.
          </p>
        </div>

        {/* Image Section */}
        <img src={DocBelow} alt="Doctor" className="search-image" />
      </div>

      {/* Search Inputs */}
      <div className="search-input-group">
        {/* Search by Name */}
        <div>
          <label className="search-input-label">Search Doctor By Name</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <PersonIcon />
            </div>
            <input
              type="text"
              placeholder="Enter doctor's name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="input-field"
            />
            <button
              onClick={handleSearchByName}
              disabled={searchName.length < 3}
              className={`input-button ${
                searchName.length >= 3
                  ? "input-button--enabled"
                  : "input-button--disabled"
              }`}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Search by City */}
        <div>
          <label className="search-input-label">Search Doctor By City</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <LocationOnIcon />
            </div>
            <input
              type="text"
              placeholder="Enter city name"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="input-field"
            />
            <button
              onClick={handleSearchByCity}
              disabled={searchCity.length < 3}
              className={`input-button ${
                searchCity.length >= 3
                  ? "input-button--enabled"
                  : "input-button--disabled"
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

// src/components/DoctorConnect/DoctorConnectComponents/DoctorConnectSearch.js
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faFlask,
  faMortarPestle,
  faSpa,
  faCapsules,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import "./DoctorConnectSearch.css";

// Use string slugs to match route params for filtering
const fields = [
  { slug: "ayurveda", title: "Ayurveda", icon: faLeaf },
  { slug: "homeopathy", title: "Homeopathy", icon: faFlask },
  { slug: "persian", title: "Persian", icon: faMortarPestle },
  { slug: "naturopathy", title: "Naturopathy", icon: faSpa },
  { slug: "unani", title: "Unani", icon: faCapsules },
  { slug: "chinese", title: "Chinese", icon: faYinYang },
];

function DoctorConnectSearch({ changeSpeciality, speciality }) {
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  // Update selectedSpeciality when speciality prop changes
  useEffect(() => {
    setSelectedSpeciality(speciality || "");
  }, [speciality]);

  // Handler for searching by doctor name (requires min 3 chars)
  const handleSearchByName = () => {
    if (searchName.trim().length >= 3) {
      window.location.href = `/searchName/${encodeURIComponent(searchName)}`;
    }
  };

  // Handler for searching by city (requires min 3 chars)
  const handleSearchByCity = () => {
    if (searchCity.trim().length >= 3) {
      window.location.href = `/search/${encodeURIComponent(searchCity)}`;
    }
  };

  // On speciality select change, push route and update state
  const handleSpecialityChange = (e) => {
    const slug = e.target.value;
    setSelectedSpeciality(slug);
    changeSpeciality(slug);
  };

  return (
    <div className="search-container">
      <div className="search-input-group">
        {/* Search by Name */}
        <div className="search-field">
          <label className="search-input-label">Search Doctor By Name</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <PersonIcon />
            </div>
            <input
              type="text"
              placeholder="Dr. Sameer, Dr. Mohit…"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="input-field"
            />
            <button
              type="button"
              onClick={handleSearchByName}
              disabled={searchName.trim().length < 3}
              className={`input-button ${
                searchName.trim().length >= 3
                  ? "input-button--enabled"
                  : "input-button--disabled"
              }`}
            >
              <SearchIcon fontSize="small" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Search by City */}
        <div className="search-field">
          <label className="search-input-label">Search Doctor By City</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <LocationOnIcon />
            </div>
            <input
              type="text"
              placeholder="Enter city or pin"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="input-field"
            />
            <button
              type="button"
              onClick={handleSearchByCity}
              disabled={searchCity.trim().length < 3}
              className={`input-button ${
                searchCity.trim().length >= 3
                  ? "input-button--enabled"
                  : "input-button--disabled"
              }`}
            >
              <SearchIcon fontSize="small" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Filter by Speciality */}
        <div className="search-field">
          <label className="search-input-label">Filter Doctor by Speciality</label>
          <div className="input-wrapper input-wrapper-select">
            <select
              className="input-field input-field-select"
              value={selectedSpeciality}
              onChange={handleSpecialityChange}
            >
              <option value="">All Specialities</option>
              {fields.map((field) => (
                <option key={field.slug} value={field.slug}>
                  {field.title}
                </option>
              ))}
            </select>
            <div className="select-icon">
              <ArrowForwardIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>

      <div className="search-pill-grid">
        {fields.map((field) => (
          <button
            key={field.slug}
            type="button"
            className={`search-pill ${
              selectedSpeciality === field.slug ? "search-pill--active" : ""
            }`}
            onClick={() => handleSpecialityChange({ target: { value: field.slug } })}
          >
            <FontAwesomeIcon icon={field.icon} />
            {field.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DoctorConnectSearch;

// src/components/DoctorConnect/DoctorConnectComponents/DoctorConnectSearch.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  faLeaf,
  faFlask,
  faMortarPestle,
  faSpa,
  faCapsules,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import "./DoctorConnectSearch.css";

const SPECIALITIES = [
  { slug: "ayurveda",    title: "Ayurveda",    icon: faLeaf },
  { slug: "homeopathy",  title: "Homeopathy",  icon: faFlask },
  { slug: "persian",     title: "Persian",     icon: faMortarPestle },
  { slug: "naturopathy", title: "Naturopathy", icon: faSpa },
  { slug: "unani",       title: "Unani",       icon: faCapsules },
  { slug: "chinese",     title: "Chinese",     icon: faYinYang },
];

function DoctorConnectSearch({ speciality, changeSpeciality }) {
  const history = useHistory();
  const [searchName, setSearchName]     = useState("");
  const [searchCity, setSearchCity]     = useState("");
  const [selectedSpec, setSelectedSpec] = useState(speciality || "");

  // sync if parent resets
  useEffect(() => {
    setSelectedSpec(speciality || "");
  }, [speciality]);

  // handlers
  const goToNameSearch = () => {
    const q = searchName.trim();
    if (q.length >= 3) history.push(`/searchName/${encodeURIComponent(q)}`);
  };

  const goToCitySearch = () => {
    const c = searchCity.trim();
    if (c.length >= 3) history.push(`/searchCity/${encodeURIComponent(c)}`);
  };

  return (
    <div className="search-container">
      <div className="search-input-group">
        {/* Search by Name */}
        <div>
          <label className="search-input-label">Search Doctor By Name</label>
          <div className="input-wrapper">
            <PersonIcon className="input-icon" />
            <input
              type="text"
              placeholder="Enter doctor's name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="input-field"
            />
            <button
              onClick={goToNameSearch}
              disabled={searchName.trim().length < 3}
              className={`input-button ${
                searchName.trim().length >= 3
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
            <LocationOnIcon className="input-icon" />
            <input
              type="text"
              placeholder="Enter city name"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="input-field"
            />
            <button
              onClick={goToCitySearch}
              disabled={searchCity.trim().length < 3}
              className={`input-button ${
                searchCity.trim().length >= 3
                  ? "input-button--enabled"
                  : "input-button--disabled"
              }`}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Filter by Speciality */}
        <div>
          <label className="search-input-label">
            Filter Doctor by Speciality
          </label>
          <div className="input-wrapper">
            <select
              className="input-field"
              value={selectedSpec}
              onChange={(e) => {
                const slug = e.target.value;
                setSelectedSpec(slug);
                // update URL & trigger fetch in parent
                changeSpeciality(slug);
              }}
            >
              <option value="">All Specialities</option>
              {SPECIALITIES.map((spec) => (
                <option key={spec.slug} value={spec.slug}>
                  {spec.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorConnectSearch;

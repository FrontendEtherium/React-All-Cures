import React, { useState } from "react";
import DocBelow from "../../../assets/img/docSearchBelow.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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

const fields = [
  { value: 1, title: "Ayurveda", icon: faLeaf },
  { value: 8, title: "Homeopathy", icon: faFlask },
  { value: 3, title: "Persian", icon: faMortarPestle },
  { value: 9, title: "Naturopathy", icon: faSpa },
  { value: 2, title: "Unani", icon: faCapsules },
  { value: 4, title: "Chinese", icon: faYinYang },
];

function DoctorConnectSearch({ changeSpeciality, speciality }) {
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState(
    speciality || ""
  );

  // Handle search by name
  const handleSearchByName = () => {
    window.location.href = `/searchName/${searchName}`;
  };

  // Handle search by city
  const handleSearchByCity = () => {
    window.location.href = `/search/${searchCity}`;
  };

  const handleSearchBySpeciality = () => {
    window.location.href = `/searchSpeciality/${selectedSpeciality}`;
  };

  return (
    <div className="search-container">
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

        {/* Search by Speciality */}
        <div>
          <label className="search-input-label">
            Filter Doctor by Speciality
          </label>
          <div className="input-wrapper">
            <select
              className="input-field"
              value={selectedSpeciality}
              onChange={(e) => (
                changeSpeciality(e.target.value),
                setSelectedSpeciality(e.target.value)
              )}
            >
              <option value="">Select a speciality</option>
              {fields.map((field) => (
                <option key={field.title} value={field.value}>
                  {field.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearchBySpeciality}
              disabled={!selectedSpeciality}
              className={`input-button ${
                selectedSpeciality
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

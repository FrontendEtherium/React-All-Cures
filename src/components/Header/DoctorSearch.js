import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Test from "../LandingPage/test";

const DoctorSearch = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchDoctors = async (query) => {
    if (query.length < 3) return;
    setLoadingDoctors(true);
    try {
      const res = await axios.get(
        `https://all-cures.com:444/cures/api/doctors/search?name=${query}`
      );
      setDoctor(res.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
      setDoctor([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const fetchCities = async (query) => {
    if (query.length < 3) return;
    setLoadingCities(true);
    try {
      const res = await axios.get(
        `https://all-cures.com:444/cures/api/city/search?query=${query}`
      );
      setCityList(res.data);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCityList([]);
    } finally {
      setLoadingCities(false);
    }
  };

  const debouncedFetchDoctors = debounce(fetchDoctors, 300);
  const debouncedFetchCities = debounce(fetchCities, 300);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (city && name) {
      window.location.href = `/search/${city}/${name}`;
    } else if (city) {
      window.location.href = `/search/${city}`;
    } else if (name) {
      window.location.href = `/searchName/${name}`;
    }
  };

  return (
    <section className="megaSearch zIndex-1">
      <div className="container">
        <div className="row">
          <div className="search-wrap-inner clearfix">
            <form
              onSubmit={handleSearchSubmit}
              className="mainSearch"
              id="searchMain"
            >
              <div className="col-md-12 p-0" id="mt">
                <div className="row">
                  <div className="doc-name col-md-6 col-sm-12" id="searchDoc">
                    <Autocomplete
                      className="bg-white color-black"
                      freeSolo
                      value={name || ""} // Ensure value is a string
                      onChange={(event, newValue) => setName(newValue || "")} // Default to an empty string
                      inputValue={name || ""}
                      onInputChange={(event, newInputValue) => {
                        setName(newInputValue || ""); // Ensure no null/undefined
                        debouncedFetchDoctors(newInputValue || ""); // Pass a valid string
                      }}
                      id="combo-box-demo-1"
                      options={doctor.length ? doctor : ["Start typing ..."]}
                      loading={loadingDoctors}
                      renderInput={(params) => (
                        <TextField {...params} label="Search Doctors (Name)" />
                      )}
                    />
                  </div>
                  <div className="city-name col-md-5" id="searchCity">
                    <Autocomplete
                      className="bg-white p-0 color-black"
                      freeSolo
                      value={city || ""} // Ensure value is a string
                      onChange={(event, newValue) => setCity(newValue || "")} // Default to an empty string
                      inputValue={city || ""}
                      onInputChange={(event, newInputValue) => {
                        setCity(newInputValue || ""); // Ensure no null/undefined
                        debouncedFetchCities(newInputValue || ""); // Pass a valid string
                      }}
                      id="combo-box-demo-2"
                      options={
                        cityList.length ? cityList : ["Start typing ..."]
                      }
                      loading={loadingCities}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Doctors (City or Pin)"
                        />
                      )}
                    />
                  </div>
                  <div className="mainBtn col-md-1">
                    <button
                      type="submit"
                      className="btn search-main-btns btn-article-search color-white float-right"
                      id="searchBtn"
                    >
                      <i className="fas fa-search" id="iconSearch"></i>
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="hidden"
                name="Latitude"
                id="Latitude"
                className="form-control"
              />
              <input
                type="hidden"
                name="Longitude"
                id="Longitude"
                className="form-control"
              />
            </form>
          </div>
        </div>
        <Test show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </section>
  );
};

export default DoctorSearch;

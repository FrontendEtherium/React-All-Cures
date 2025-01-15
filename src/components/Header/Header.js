import React, { useState, useEffect } from "react";
import "./header.css";
import "../../assets/healthcare/css/mobile.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { backendHost } from "../../api-config";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { userAccess } from "../UserAccess";
import { imgKitImagePath } from "../../image-path";
import DoctorSearch from "./DoctorSearch";

const Header = () => {
  const [isUnaniDropdownOpen, setIsUnaniDropdownOpen] = useState(false);
  const [article, setArticle] = useState("");
  const [diseaseTitle, setDiseaseTitle] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  console.log("header re rendered");
  
  useEffect(() => {
    if (article) {
      axios
        .get(`${backendHost}/isearch/combo/${article}`)
        .then((res) => setDiseaseTitle(res.data))
        .catch((err) => console.error("Error fetching disease titles", err));
    }
  }, [article]);

  const handleUnaniMouseEnter = () => setIsUnaniDropdownOpen(true);
  const handleUnaniMouseLeave = () => setIsUnaniDropdownOpen(false);

  const logout = () => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendHost}/LogoutActionController`, {
        headers: { "Access-Control-Allow-Credentials": true },
      })
      .then(() => {
        Cookies.remove("uName");
        setTimeout(() => window.location.reload(), 200);
      })
      .catch((err) => console.error("Error logging out", err));
  };

  const articleSearch = (e) => {
    e.preventDefault();
    const path = article ? `/searchcures/${article}` : `/searchcures`;
    window.location.href = path;
  };

  return (
    <div className="profilePage">
      <section className="pageHeader zIndex-2">
        <div className="webAlign">
          <div className="row d-flex">
            <div className="header" style={{ width: "100%" }}>
              <div className="logo mt-3">
                <Link to="/">
                  <img
                    src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/heart.png`}
                    alt="All Cures Logo"
                  />
                  <span>All Cures</span>
                </Link>
              </div>

              <div className="fgrow">
                <nav className="navbar navbar-expand-lg navbar-light bg-light newHeader">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Home
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="categoriesDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Categories
                        </a>
                        <div className="dropdown-menu" aria-labelledby="categoriesDropdown">
                          <a className="dropdown-item" href="/searchcategory/disease/1">
                            Arthritis
                          </a>
                          <a className="dropdown-item" href="/searchcategory/disease/74">
                            Diabetes
                          </a>
                          <a className="dropdown-item" href="/searchcategory/disease/50">
                            Hypertension
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/allcategory">
                            View More
                          </a>
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="trendingCuresDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Trending Cure
                        </a>
                        <div className="dropdown-menu" aria-labelledby="trendingCuresDropdown">
                          <a className="dropdown-item" href="/searchmedicine/medicinetype/1">
                            Ayurveda
                          </a>
                          <a className="dropdown-item" href="/searchmedicine/medicinetype/4">
                            Chinese Medicine
                          </a>
                          <a
                            className="dropdown-item"
                            href="/searchmedicine/medicinetype/12"
                            onMouseEnter={handleUnaniMouseEnter}
                            onMouseLeave={handleUnaniMouseLeave}
                          >
                            Arabic
                            <ul
                              className={`nav-item dropdown newDropdown ${isUnaniDropdownOpen ? "show" : ""}`}
                              onMouseEnter={handleUnaniMouseEnter}
                              onMouseLeave={handleUnaniMouseLeave}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/searchmedicine/medicinetype/2"
                                >
                                  Unani
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="/searchmedicine/medicinetype/3"
                                >
                                  Persian
                                </a>
                              </li>
                            </ul>
                          </a>
                          <a className="dropdown-item" href="/searchmedicine/medicinetype/6">
                            Japanese
                          </a>
                          <a className="dropdown-item" href="/searchmedicine/medicinetype/5">
                            Scandinavian
                          </a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/AboutUs">
                          About Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <form onSubmit={articleSearch} id="searchArticle">
                <div className="col-md-12 row mr-2">
                  <div className="col-md-10 p-0">
                    <Autocomplete
                      className="bg-white color-black"
                      freeSolo
                      value={article}
                      onChange={(event, newValue) => setArticle(newValue)}
                      inputValue={article}
                      onInputChange={(event, newInputValue) => setArticle(newInputValue)}
                      id="combo-box-demo"
                      options={article.length >= 1 ? diseaseTitle : []}
                      sx={{ width: 150 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Search Cures" />
                      )}
                    />
                  </div>
                  <div className="col-md-2 p-0 mainBtn">
                    <button
                      className="btn search-main-btns color-white"
                      id="searchHead"
                      type="submit"
                    >
                      <i className="fas header-search fa-search" id="iconSearch"></i>
                    </button>
                  </div>
                </div>
              </form>

              <div className="loginSign">
                {userAccess ? (
                  <Link
                    className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark"
                    id="Article"
                    to="/article"
                  >
                    <img
                      src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/edit_black_48dp.svg`}
                      alt="create cures"
                      className="filter-white"
                      height="30px"
                    />
                  </Link>
                ) : (
                  <button
                    className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark"
                    id="Article"
                    onClick={() => setModalShow(true)}
                  >
                    <img
                      src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/edit_black_48dp.svg`}
                      alt="create cures"
                      className="filter-white"
                      height="30px"
                    />
                  </button>
                )}
                <ToggleButton
                  userName={Cookies.get("uName")}
                  setModalShow={setModalShow}
                  userAccess={userAccess}
                  logout={logout}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <DoctorSearch />
    </div>
  );
};

const ToggleButton = ({ userAccess, setModalShow, logout }) => {
  if (userAccess) {
    return (
      <Dropdown>
        <Dropdown.Toggle className="header-drop text-capitalize" id="dropHead">
          <img
            alt="list"
            className="filter-white"
            src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/account_circle_black_48dp.svg`}
            height="30px"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link className="text-dark btn" to="/user/profile">
              Profile
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link to="/editSubscribe" className="text-dark btn">
              Edit Subscription
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link to="/chatlist" className="text-dark btn">
              My Inbox
            </Link>
          </Dropdown.Item>

          {userAccess >= 4 ? (
            <Dropdown.Item>
              <Link to="/dashboard" className="text-dark btn">
                Dashboard
              </Link>
            </Dropdown.Item>
          ) : (
            <Dropdown.Item>
              <Link to="/my-cures" className="text-dark btn">
                My Favourite Cures
              </Link>
            </Dropdown.Item>
          )}
          <Dropdown.Item>
            <button
              className="btn text-dark text-capitalize"
              onClick={logout}
            >
              Logout
            </button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return (
    <button
      className="btn primary-btn-color text-light loginSignbtn color-blue-dark"
      id="signIn"
      variant="dark"
      style={{ width: "10rem" }}
      onClick={() => setModalShow(true)}
    >
      Sign in/Sign up
    </button>
  );
};

export default React.memo(Header);
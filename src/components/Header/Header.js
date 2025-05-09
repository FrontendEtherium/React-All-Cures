import React, { useState, useEffect, useCallback, useMemo } from "react";
import { imgKitImagePath } from "../../image-path";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import debounce from "lodash.debounce";
import { backendHost } from "../../api-config";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Test from "../LandingPage/test";
import Cookies from "js-cookie";
import { Dropdown } from "react-bootstrap";
import "./header.css";
import { userAccess } from "../UserAccess";
import { useHistory } from "react-router-dom";
const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/AboutUs", label: "About Us" },
  { to: "/doctor", label: "Consult Now" },
  {
    label: "Natural Treatments",
    children: [
      { to: "/doctor-connect/ayurveda", label: "Ayurveda" },
      { to: "/doctor-connect/homeopathy", label: "Homeopathy" },
      { to: "/doctor-connect/naturopathy", label: "Naturopathy" },
      { to: "/doctor-connect/unani", label: "Unani" },
      { to: "/doctor-connect/tcm", label: "TCM" },
      { to: "/doctor-connect/persian", label: "Persian" },
    ],
  },
  { to: "/allcures", label: "Cures" },
  { to: "/article", label: "Create Article" },
];
const NAV_ITEMS_DESKTOP = [
  { to: "/", label: "Home" },
  { to: "/AboutUs", label: "About Us" },
  { to: "/doctor", label: "Consult Now" },
  {
    label: "Natural Treatments",
    children: [
      { to: "/doctor-connect/ayurveda", label: "Ayurveda" },
      { to: "/doctor-connect/homeopathy", label: "Homeopathy" },
      { to: "/doctor-connect/naturopathy", label: "Naturopathy" },
      { to: "/doctor-connect/unani", label: "Unani" },
      { to: "/doctor-connect/tcm", label: "TCM" },
      { to: "/doctor-connect/persian", label: "Persian" },
    ],
  },
  { to: "/allcures", label: "Cures" },
];

export default function UpdatedHeader() {
  const [openIndex, setOpenIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [article, setArticle] = useState("");
  const [diseaseTitle, setDiseaseTitle] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const history = useHistory();
  const navItems = useMemo(() => NAV_ITEMS, []);

  const fetchTitles = useCallback(
    debounce((query) => {
      if (query.length < 2) {
        setDiseaseTitle([]);
        return;
      }

      axios
        .get(`${backendHost}/isearch/combo/${query}`)
        .then((res) => {
          setDiseaseTitle(res.data);
        })
        .catch((err) => {
          console.error("Error fetching disease titles", err);
        });
    }, 300),
    []
  );
  useEffect(() => {
    fetchTitles(article);
  }, [article]);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      history.push(article ? `/searchcures/${article}` : `/searchcures`);
    },
    [article, history]
  );

  return (
    <>
      <nav className="nav container">
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-controls="mobile-nav"
          aria-expanded={mobileMenuOpen}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>

        <ul className="nav-links nav-left">
          {NAV_ITEMS_DESKTOP.map((item, idx) => (
            <li
              key={item.label}
              className={`nav-item${item.children ? " dropdown" : ""}`}
              onMouseEnter={() => item.children && setOpenIndex(idx)}
              onMouseLeave={() => item.children && setOpenIndex(null)}
            >
              {item.to ? (
                <Link to={item.to} className="nav-link">
                  {item.label}
                </Link>
              ) : (
                <button
                  className="nav-link dropdown-toggle"
                  aria-haspopup
                  aria-expanded={openIndex === idx}
                  style={idx === 3 ? { background: "none" } : undefined}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  {item.label}
                </button>
              )}
              {item.children && (
                <ul
                  className="dropdown-menu"
                  style={{
                    display: openIndex === idx ? "block" : "none",
                  }}
                >
                  {item.children.map((sub) => (
                    <li key={sub.label}>
                      <Link to={sub.to} className="dropdown-item">
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* CENTER LOGO */}
        <div className="nav-center">
          <Link to="/" aria-label="Home">
            <div className="logo-container">
              <img
                src={`${imgKitImagePath}/tr:w-80,f-webp/assets/img/heart.png`}
                rel="preload"
                alt="All Cures logo"
                className="logo"
              />
            </div>
          </Link>
        </div>

        {/* RIGHT (desktop) */}
        <ul className="nav-links nav-right">
          <li className="nav-item nav-left">
            <Link to="/AboutUs" className="nav-link">
              Contact Us
            </Link>
          </li>

          <li className="nav-item search-wrapper">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <Autocomplete
                freeSolo
                value={article}
                onChange={(_, v) => setArticle(v || "")}
                inputValue={article}
                onInputChange={(_, v) => setArticle(v)}
                options={article.length >= 2 ? diseaseTitle : []}
                sx={{ width: { xs: 80, s: 100, m: 120, lg: 150 } }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Cures"
                    variant="standard"
                    className="text-input"
                    aria-label="Search Cures"
                  />
                )}
              />
              <button
                className="btn search-main-btns color-white"
                id="searchHead"
                type="submit"
                aria-label="Submit search"
              >
                <i className="fas header-search fa-search" id="iconSearch"></i>
              </button>
            </form>
          </li>
          <div className="nav-left-btn">
            {userAccess ? (
              <Link
                className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark createcure"
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
              <li className="nav-item">
                <button
                  className="login-btn"
                  aria-label="Log in"
                  onClick={() => setModalShow(true)}
                >
                  {/* <FontAwesomeIcon
                    icon={faUser}
                    className="user-icon"
                    color="white"
                  />
                  Login */}
                  <img
                    className="filter-white"
                    src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/account_circle_black_48dp.svg`}
                    height="30px"
                    alt="account"
                  />
                </button>
              </li>
            )}
            <ToggleButton
              userName={Cookies.get("uName")}
              setModalShow={setModalShow}
              userAccess={userAccess}
              logout={logout}
            />
          </div>
        </ul>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-nav-overlay">
          <ul className="mobile-nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} onClick={() => setMobileMenuOpen(false)}>
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {item.children && (
                  <ul className="mobile-submenu">
                    {item.children.map((sub) => (
                      <li key={sub.label}>
                        <Link to={sub.to}>{sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link to="/AboutUs">Contact Us</Link>
            </li>
          </ul>
        </div>
      )}

      <Test show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

const ToggleButton = React.memo(function ToggleButton(props) {
  if (props.userAccess) {
    return (
      <Dropdown>
        <Dropdown.Toggle className="header-drop text-capitalize" id="drop-down">
          <img
            className="filter-white"
            src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/account_circle_black_48dp.svg`}
            height="30px"
            alt="account"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link className="text-dark btn" to={`/user/profile`}>
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
          <Dropdown.Item>
            <Link className="text-dark btn" to={`/bookings`}>
              My Bookings
            </Link>
          </Dropdown.Item>
          {props.userAccess >= 4 ? (
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
              onClick={props.logout}
            >
              Logout
            </button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return <></>;
});
const logout = async () => {
  axios.defaults.withCredentials = true;
  Cookies.remove("uName");
  fetch(`${backendHost}/LogoutActionController`, {
    method: "POST",
    credentials: "include",
    headers: { "Access-Control-Allow-Credentials": true },
  })
    .then(() => {
      Cookies.remove("uName");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      console.error(error);
    });
};

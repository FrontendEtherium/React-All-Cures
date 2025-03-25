import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Carousel, Dropdown } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Footer from "../Footer/Footer";
import DoctorSearch from "../Header/DoctorSearch";
import Carousel1 from "./Caousel1";
import Carousel2 from "./Carousel2";
import ArticlePreview from "./ArticlePreview";
import TrendingArticles from "./TrendingArticles";
import FeaturedArticles from "./FeaturedArticles";
import Test from "./test";

import { imgKitImagePath } from "../../image-path";
import { backendHost } from "../../api-config";
import headers from "../../api-fetch";
import { userId } from "../UserId";
import { userAccess } from "../UserAccess";

import "../../assets/healthcare/css/main.css";
import "../../assets/healthcare/css/responsive.css";
import "../../assets/healthcare/css/animate.css";
import "../../assets/healthcare/icomoon/style.css";
import "./custom.css";
import "./Home.css";
import "react-phone-number-input/style.css";

function Home(props) {
  // State declarations
  const [carouselImages] = useState([
    `${imgKitImagePath}/assets/img/HomePage1.jpg`,
    `${imgKitImagePath}/assets/img/HomePage2.jpg`,
  ]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUnaniDropdownOpen, setIsUnaniDropdownOpen] = useState(false);
  const [afterSubmitLoad, setAfterSubmitLoad] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [articleFilter, setArticleFilter] = useState("");
  const [article, setArticle] = useState("");
  const [users, setUsers] = useState([]);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [texts, setTexts] = useState("");
  const [cityList, setCityList] = useState([]);
  const [pinList, setPinList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsDoc, setSuggestionsDoc] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [diseaseTitle, setDiseaseTitle] = useState([]);
  const [mobile, setMobile] = useState("");
  const [getPincode, setGetPincode] = useState(null);
  const [getCityName, setGetCityName] = useState(null);
  const [edit, setEdit] = useState(false);
  const [doctorLoaded, setDoctorLoaded] = useState(false);
  const [modalShow, setModalShow] = useState(
    props.location.state ? props.location.state.modalShow : false
  );
  const [path, setPath] = useState(
    props.location.state ? props.location.state.path : ""
  );
  const [show, setShow] = useState(false);
  const [docname, setDocname] = useState("");
  const [spec1, setSpec1] = useState([]);
  const [param] = useState(props.match.params);
  const [cures, setCures] = useState([]);
  const [disease, setDisease] = useState([]);
  const [setVisible, setSetVisible] = useState(false);
  const [searchParams, setSearchParams] = useState({
    city: "",
    Pincode: "",
    name: "",
    subscription: "",
  });
  const [ads, setAds] = useState("");
  const [adId, setAdId] = useState("");
  const [speciality, setSpeciality] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const floaterInterval = useRef(null);

  // Functions
  const loadFloater = async () => {
    try {
      const res = await axios.get(`${backendHost}/data/newsletter/get`);
      setImages(res.data);
    } catch (err) {
      // Handle error if needed
    }
  };

  const rotateImages = () => {
    setCurrentIndex((prevIndex) =>
      images.length ? (prevIndex + 1) % images.length : 0
    );
  };

  const floaterShow = () => {
    floaterInterval.current = setInterval(rotateImages, 3000);
  };

  const handleModalClose = () => {
    if (floaterInterval.current) {
      clearInterval(floaterInterval.current);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/sponsored/list/ads/url/1`
      );
      if (response.data !== "All Ads are Served") {
        const id = response.data.split("/")[3];
        const ids = id.match(/\d+/);
        const adsId = ids[0];
        setAdId(adsId);
      }
      const newResponse = `https://all-cures.com:444${response.data}`;
      console.log(newResponse);
      setAds(newResponse);
    } catch (error) {
      // Optionally set error state here
    }
  };

  const handleClick = (ad) => {
    console.log("Image clicked!", ad);
    axios.put(`${backendHost}/sponsored/ads/clicks/${ad}`);
  };

  const postSubscribtion = () => {
    const phoneNumber = value.split("+")[1];
    console.log(value);
    const countryCodeLength = phoneNumber.length % 10;
    const countryCode = phoneNumber.slice(0, countryCodeLength);
    const StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, "");
    console.log(isValidPhoneNumber(value));
    if (!isValidPhoneNumber(value)) {
      Alert("Please enter a 10-digit phone number!");
      return;
    }
    setAfterSubmitLoad(true);
    axios
      .post(`${backendHost}/users/subscribe/${StringValue}`, {
        nl_subscription_disease_id: disease.join(","),
        nl_sub_type: 1,
        nl_subscription_cures_id: cures.join(","),
        country_code: countryCode,
      })
      .then((res) => {
        setAfterSubmitLoad(false);
        if (res.data === "Subscribed") {
          Alert("You have successfully subscribed to our Newsletter");
        } else if (res.data === "Already subscribed") {
          Alert("You are already subscribed to our Newsletter");
        } else {
          Alert("Some error occurred! Please try again later.");
        }
      })
      .catch((err) => {
        setAfterSubmitLoad(false);
        Alert("Some error occurred! Please try again later.");
      });
  };

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const logout = async () => {
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
      .catch(() => {});
  };

  const Alert = (msg) => {
    setShowAlert(true);
    setAlertMsg(msg);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleUnaniMouseEnter = () => {
    setIsUnaniDropdownOpen(true);
  };

  const handleUnaniMouseLeave = () => {
    setIsUnaniDropdownOpen(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (city && name) {
      props.history.push(`/search/${city}/${name}`);
    } else if (city) {
      props.history.push(`/search/${city}`);
    } else if (name) {
      props.history.push(`/searchName/${name}`);
    }
  };

  const articleSearch = (e) => {
    e.preventDefault();
    if (article) {
      props.history.push(`/searchcures/${article}`);
    } else {
      props.history.push(`/searchcures`);
    }
  };

  const clickCounter = async () => {
    try {
      if (userId) {
        await axios.post(`${backendHost}/video/consult/counts/${userId}`);
      } else {
        await axios.post(`${backendHost}/video/consult/counts/0`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Effects
  useEffect(() => {
    if (userId) {
      setModalShow(false);
    }

    loadFloater();

    const loadUsers = async () => {
      try {
        const res = await axios.get(`${backendHost}/city/all`);
        setUsers(res.data);
        const newCityList = res.data.reduce((acc, u) => {
          acc.push(u.Cityname, u.Pincode);
          return acc;
        }, []);
        setCityList(newCityList);
      } catch (err) {
        // Handle error if needed
      }
    };
    loadUsers();

    const loadDoctor = async () => {
      try {
        const res = await axios.get(
          `${backendHost}/IntegratedActionController`
        );
        setDoctor(res.data);
        setDoctorLoaded(true);
      } catch (err) {
        // Handle error if needed
      }
    };
    loadDoctor();

    Promise.all([
      fetch(`${backendHost}/article/all/table/disease_condition`, {
        headers: headers,
      }).then((res) => res.json()),
    ])
      .then(([diseaseData]) => {
        setIsLoaded(true);
        setSpeciality(diseaseData);
        setSpec1(diseaseData.map((i) => i[3]));
      })
      .catch(() => {});

    // Call fetchData on mount
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (article) {
      axios.get(`${backendHost}/isearch/combo/${article}`).then((res) => {
        setDiseaseTitle(res.data);
      });
    }
  }, [article]);

  return (
    <div>
      {afterSubmitLoad && (
        <div className="loader main on-submit-loading">
          <img
            src={imgKitImagePath + "/assets/img/heart.png"}
            alt="All Cures Logo"
            id="heart"
          />
        </div>
      )}
      {showAlert && (
        <div className="alert alert-success pop-up border-bottom">
          <div className="h5 mb-0 text-center">{alertMsg}</div>
          <div className="timer"></div>
        </div>
      )}
      <div className="profilePage">
        <div className="">
          <section className=" zIndex-2">
            <div className="webAlign">
              <div className="row d-flex">
                <div className="header" style={{ width: "100%" }}>
                  <div className=" logo mt-1">
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
                      <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                      >
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
                            <div
                              className="dropdown-menu"
                              aria-labelledby="categoriesDropdown"
                            >
                              <a
                                className="dropdown-item"
                                href="/searchcategory/disease/1"
                              >
                                Arthritis
                              </a>
                              <a
                                className="dropdown-item"
                                href="/searchcategory/disease/74"
                              >
                                Diabetes
                              </a>
                              <a
                                className="dropdown-item"
                                href="/searchcategory/disease/50"
                              >
                                Hypertension
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/allcategory">
                                View More
                              </a>
                            </div>
                          </li>
                          <li className="nav-item dropdown ">
                            <a
                              className="nav-link dropdown-toggle"
                              href="#trends"
                              id="trendingCuresDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Trending Cures
                            </a>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="trendingCuresDropdown"
                            >
                              <a
                                className="dropdown-item"
                                href="/searchmedicine/medicinetype/1"
                              >
                                Ayurveda
                              </a>
                              <a
                                className="dropdown-item"
                                href="/searchmedicine/medicinetype/4"
                              >
                                Chinese Medicine
                              </a>
                              <a
                                className="dropdown-item"
                                href="/searchmedicine/medicinetype/12"
                                onMouseEnter={handleUnaniMouseEnter}
                                onMouseLeave={handleUnaniMouseLeave}
                              >
                                Arabic
                                <li
                                  className="nav-item dropdown newDropdown"
                                  onMouseEnter={handleUnaniMouseEnter}
                                  onMouseLeave={handleUnaniMouseLeave}
                                >
                                  <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="unaniDropdownToggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                  >
                                    <span
                                      style={{
                                        fontSize: "1rem",
                                        color: "#212529",
                                      }}
                                    >
                                      <ArrowDropDownIcon />
                                    </span>
                                  </a>
                                  {isUnaniDropdownOpen && (
                                    <ul
                                      className="dropdown-menu newDropdown-menu"
                                      aria-labelledby="unaniDropdownToggle"
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
                                  )}
                                </li>
                              </a>
                              <a
                                className="dropdown-item"
                                href="/searchmedicine/medicinetype/6"
                              >
                                Japanese
                              </a>
                              <a
                                className="dropdown-item"
                                href="/searchmedicine/medicinetype/5"
                              >
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
                  <form
                    onSubmit={articleSearch}
                    className="searchHeader"
                    id="searchArticle"
                  >
                    <div className="col-md-12 row">
                      <div className="col-md-10 p-0">
                        <Autocomplete
                          className="bg-white color-black"
                          freeSolo
                          value={article}
                          onChange={(event, newValue) => {
                            setArticle(newValue);
                          }}
                          inputValue={article || ""}
                          onInputChange={(event, newInputValue) => {
                            setArticle(newInputValue);
                          }}
                          id="combo-box-demo"
                          options={
                            article && article.length >= 1 ? diseaseTitle : []
                          }
                          sx={{ width: 170 }}
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
                          <i
                            className="fas header-search fa-search"
                            id="iconSearch"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="loginSign d-flex">
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
            <Test
              show={modalShow}
              path={path}
              onHide={() => setModalShow(false)}
            />
          </section>
        </div>
      </div>
      <div className="doctor-patient-banner-container">
        <Carousel interval={4000} pause={false} indicators={true}>
          {carouselImages.map((img, index) => (
            <Carousel.Item key={index}>
              {index + 1 === 2 ? (
                <img
                  src={img}
                  alt={`Doctor Patient Connect ${index + 1}`}
                  className="img-fluid rounded doctor-patient-banner"
                />
              ) : (
                <a href="#trends">
                  <img
                    src={img}
                    alt={`Doctor Patient Connect ${index + 1}`}
                    className="img-fluid rounded doctor-patient-banner"
                  />
                </a>
              )}
              {index + 1 === 2 && (
                <Carousel.Caption>
                  <button
                    className="doctor-patient-banner-btn"
                    onClick={() => {
                      window.location.href = "/landing-doctor";
                      clickCounter();
                    }}
                  >
                    Consult Now
                  </button>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <DoctorSearch />
      <section className="tabslider clerfix">
        <div className="container">
          <div className="row">
            <div className="tab-nav">
              <div
                className="comman-heading"
                itemscope
                itemtype="http://all-cures.com/Product"
              >
                <h1 style={{ display: "none" }}>
                  All Cures is a product developed, managed and owned by
                  Etherium Technologies. Our mission is to make it simple and
                  convenient for users to get information on Cures from anywhere
                  in the world. Our belief is that your wellness is your
                  well-being. We are passionate about giving our users the
                  unique experience that is both fulfilling and wholesome.
                </h1>
                <h2 style={{ display: "none" }}>
                  Ayurveda, Homeopathy, Chinese Medicine, Persian, Unani
                </h2>
                <div className="h4 mt-4" itemprop="Category">
                  Choose by Diseases
                </div>
              </div>
            </div>
            <Carousel1 city={searchParams.city} />
          </div>
        </div>
      </section>

      <section className="mb-5 mt-2">
        <div className="container">
          <div className="row">
            <div className="comman-heading">
              <div className="h4">Featured Cures</div>
            </div>
          </div>
          <div className="row">
            <FeaturedArticles />
          </div>
        </div>
      </section>

      {ads && ads !== "https://all-cures.com:444All Ads are Served" && (
        <div className="container d-flex justify-content-center">
          <img
            className="mb-5 ml-1"
            id="left-menu-ad"
            src={ads}
            alt="ad"
            onClick={() => handleClick(adId)}
          />
        </div>
      )}

      <section className="mb-5 mt-2">
        <div className="container" id="trends">
          <div className="row">
            <div className="comman-heading">
              <div className="h4">Trending Cures</div>
            </div>
          </div>
          <div className="row">
            <TrendingArticles />
          </div>
        </div>
      </section>

      <section className="trending-section">
        <ArticlePreview articleFilter={articleFilter} />
      </section>

      <section className="specialists mt-3">
        <div className="container">
          <div className="row">
            <div className="comman-heading">
              <div className="h4 mt-4">Choose by Doctors</div>
            </div>
          </div>
          <div className="row">
            <div className="nav-btn prev-slide"></div>
            <div className="nav-btn next-slide"></div>
            <Carousel2 />
          </div>
        </div>
      </section>

      <div>
        <button
          id="mobile-subscribe-fixed-btn"
          className="btn newsletter-icon rounded subscribe-btn newsletter_float"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
          onClick={floaterShow}
        >
          Subscribe
        </button>
        <Link to="/feedback">
          <button
            id="mobile-feedback-fixed-btn"
            className="btn newsletter-icon rounded subscribe-btn newsletter_float"
          >
            Feedback
          </button>
        </Link>
      </div>
      <div
        className="modal fade bd-example-modal-lg mt-5"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                onClick={handleModalClose}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <section className="appStore">
              <div className="container">
                <div className="row">
                  <div
                    className="appStoreBg clearfix"
                    style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
                  >
                    <div className="col-md-6 col-sm-6 col-sx-12">
                      <div className="innerapp">
                        <div className="doc-img ">
                          {images.length > 0 ? (
                            <img
                              src={`https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp${images[currentIndex]}`}
                              alt="doct"
                              style={{ maxHeight: "400px", width: "405px" }}
                            />
                          ) : (
                            <img
                              src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/doct.png`}
                              alt="doctor"
                              style={{ maxHeight: "400px", width: "397px" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-sx-12 bg-white subs-hero-2">
                      <div className="subscribe">
                        <h1 className="text-dark">All Cures</h1>
                        <div className="h5">
                          Sign up for our free <span>All Cures</span> Daily
                          Newsletter
                        </div>
                        <br />
                        <div className="h5">
                          Get <span>doctor-approved</span> health tips, news,
                          and more
                        </div>
                        <div className="form-group relative">
                          <div className="aaa">
                            <PhoneInput
                              placeholder="Enter phone number"
                              value={value}
                              defaultCountry="IN"
                              onChange={(newValue) => setValue(newValue)}
                            />
                          </div>
                          <div>
                            <button
                              className="bcolor rounded py-2"
                              onClick={postSubscribtion}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ToggleButton(props) {
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
  return (
    <button
      className="btn primary-btn-color text-light loginSignbtn color-blue-darks"
      style={{ width: "10rem" }}
      onClick={() => props.setModalShow(true)}
    >
      Sign in/Sign up
    </button>
  );
}

export default Home;

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
import SubscriberComponent from "./HomeComponents/SubscriberComponent";
import ExpertAdviceComponent from "./HomeComponents/ExpertAdviceComponent";
import TrendingSearches from "./HomeComponents/TrendingSearches";

import TrustPartnerSection from "./HomeComponents/TrustPartnerSection";
import FeaturedBlogs from "./HomeComponents/FeaturedBlogs";
import TrendingCures from "./HomeComponents/TrendingCures";
import OurExpert from "./HomeComponents/OurExpert";
import UpdatedHeader from "../Header/Header";
import DoctorCures from "./HomeComponents/DoctorCures";
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

    fetchData();
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

      <UpdatedHeader />
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
                      window.location.href = "/doctor";
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
      <TrendingSearches />
      <FeaturedBlogs />
      <TrendingCures />
      <DoctorCures />

      <TrustPartnerSection />
      <OurExpert />
      <ExpertAdviceComponent />
      <SubscriberComponent />
      <Footer />
    </div>
  );
}

export default Home;

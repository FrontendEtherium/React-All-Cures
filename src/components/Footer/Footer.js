import React, { memo } from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import GooglePlay from "../../assets/icon/googleplay.png";
import AppStore from "../../assets/icon/appstore.png";
import { imgKitImagePath } from "../../image-path";

const Footer = () => {
  return (
    <div>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-sx-12">
              <div className="footer-inner">
                <h1>About us</h1>
                <p>
                  All Cures is a product developed, managed, and owned by
                  Etherium Technologies. Our mission is to make it simple and
                  convenient for users to get information on Cures from anywhere
                  in the world. Our belief is that your wellness is your
                  well-being. We are passionate about giving our users the
                  unique experience that is both fulfilling and wholesome.
                </p>
              </div>
            </div>
            <div className="col-md-2 col-sm-2 col-sx-12">
              <div className="footer-inner">
                <h1>Top Cures</h1>
                <ul>
                  {[
                    { id: 1, name: "Arthritis" },
                    { id: 74, name: "Diabetes" },
                    { id: 50, name: "Hypertension" },
                    { id: 164, name: "Insomnia" },
                    { id: 155, name: "Skin Care" },
                    { id: 87, name: "Thyroid" },
                    { id: 160, name: "Psoriasis" },
                  ].map((cure) => (
                    <Link
                      key={cure.id}
                      to={`/searchcategory/disease/${cure.id}`}
                    >
                      <li>
                        <p className="text-light">{cure.name}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-sx-12">
              <div className="footer-inner">
                <h1>Discover</h1>
                <ul>
                  <Link to="/article">
                    <li>
                      <p className="text-light">Create A Cure</p>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-sx-12">
              <div className="footer-inner">
                <h1>Download the All-Cures App here:</h1>
                <a
                  href="https://play.google.com/store/apps/details?id=com.allcures"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <img
                      src={GooglePlay}
                      alt="Google Play Link"
                      width="150"
                      style={{ marginBottom: "7px", marginRight: "5px" }}
                    />
                  </span>
                </a>
                <a
                  href="https://apps.apple.com/in/app/all-cures/id1659590351"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <img
                      src={AppStore}
                      alt="Apple Link"
                      width="150"
                      style={{ marginBottom: "7px" }}
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-bootm">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 disclaimer mb-3">
              Disclaimer: Content available on All Cures website is not intended
              to be a substitute for professional medical advice, diagnosis, or
              treatment. It is strongly recommended to consult your physician or
              other qualified medical practitioner with any questions you may
              have regarding a medical condition. The website should not be used
              as a source for treatment of any medical condition.
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="textSize logo">
                <a href="/#">
                  <img
                    src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/heart.png`}
                    alt="All Cures Logo"
                    style={{ width: "40px" }}
                  />
                  <span>All Cures</span>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="copyRight">
                <p>
                  All rights reserved. Copyright{" "}
                  <i className="far fa-copyright fa-1x"></i>2022{" "}
                  <a href="https://etheriumtech.com">Etherium Technologies</a>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="socia-media-footer">
                <ul>
                  {[
                    {
                      href: "https://www.facebook.com/All-Cures-100610265834385",
                      img: "facebook.svg",
                    },
                    {
                      href: "https://www.instagram.com/allcuresinfo/",
                      img: "instagram.svg",
                    },
                    {
                      href: "https://twitter.com/allcuresinfo",
                      img: "twitter.svg",
                    },
                    {
                      href: "https://www.linkedin.com/company/etherium-technologies/",
                      img: "linkedin.svg",
                    },
                  ].map((social, idx) => (
                    <li key={idx}>
                      <a href={social.href} target="_blank" rel="noreferrer">
                        <img
                          src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/${social.img}`}
                          alt={social.img}
                          height="30px"
                          width="30px"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="back-top">
            <a href="#" id="scroll" style={{ display: "block" }}>
              <span></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);

import React, { memo } from "react";
import { Link } from "react-router-dom";
import GooglePlay from "../../assets/icon/googleplay.png";
import AppStore from "../../assets/icon/appstore.png";
import { imgKitImagePath } from "../../image-path";
import "./Footer.css";

const Footer = () => (
  <footer>
    {/* Top blue section */}
    <div className="footer-top text-white">
      <div className="container">
        <div className="row">
          {/* 1) Logo */}
          <div className="col-lg-2 col-sm-6 col-12 footer-brand mb-4">
            <a
              href="/"
              className="d-flex align-items-center justify-content-sm-start justify-content-center"
            >
              <img
                src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/heart.png`}
                alt="All Cures Logo"
                className="brand-icon"
              />
              <span className="brand-text">ALL CURES</span>
            </a>
          </div>

          {/* 2) About Us */}
          <div className="col-lg-2 col-sm-6 col-12 mb-4">
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* 3) Ayurveda, Unani… */}
          <div className="col-lg-2 col-sm-6 col-12 mb-4">
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/ayurveda">Ayurveda</Link>
              </li>
              <li>
                <Link to="/unani">Unani</Link>
              </li>
              <li>
                <Link to="/homeopathy">Homeopathy</Link>
              </li>
              <li>
                <Link to="/naturopathy">Naturopathy</Link>
              </li>
              <li>
                <Link to="/tcm">TCM</Link>
              </li>
            </ul>
          </div>

          {/* 4) Privacy & Feedback */}
          <div className="col-lg-2 col-sm-6 col-12 mb-4">
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/newsletter">Subscribe to our Newsletter</Link>
              </li>
              <li>
                <Link to="/feedback">Share your Feedback</Link>
              </li>
            </ul>
          </div>

          {/* 5) Downloads + Social */}
          <div className="col-lg-4 col-sm-12 col-12 text-sm-left text-center">
            <p className="download-heading">Download the All-Cures App:</p>
            <div className="app-badges mb-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.allcures"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={GooglePlay}
                  alt="Get it on Google Play"
                  className="badge-img"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/all-cures/id1659590351"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={AppStore}
                  alt="Download on the App Store"
                  className="badge-img"
                />
              </a>
            </div>

            <ul className="list-inline social-icons mb-0">
              {[
                {
                  href: "https://www.facebook.com/All-Cures-100610265834385",
                  img: "facebook.svg",
                  alt: "Facebook",
                },
                {
                  href: "https://www.linkedin.com/company/etherium-technologies/",
                  img: "linkedin.svg",
                  alt: "LinkedIn",
                },
                {
                  href: "https://www.youtube.com/channel/UCxxxx",
                  img: "youtube.svg",
                  alt: "YouTube",
                },
                {
                  href: "https://www.instagram.com/allcuresinfo/",
                  img: "instagram.svg",
                  alt: "Instagram",
                },
              ].map((social, i) => (
                <li key={i} className="list-inline-item mx-1">
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <img
                      src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/${social.img}`}
                      alt={social.alt}
                      className="social-icon"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom grey disclaimer */}
    <div className="footer-bottom">
      <div className="container">
        <p className="disclaimer mb-0 text-center text-sm-left">
          Disclaimer: Content available on All Cures website is not intended to
          be a substitute for professional medical advice, diagnosis, or
          treatment. It is strongly recommended to consult your physician or
          other qualified medical practitioner with any questions you may have
          regarding a medical condition. The website should not be used as a
          source for treatment of any medical condition.
        </p>
      </div>
    </div>
  </footer>
);

export default memo(Footer);

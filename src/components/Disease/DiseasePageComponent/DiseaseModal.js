import React, { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { backendHost } from "../../../api-config";
import { imgKitImagePath } from "../../../image-path";

const DiseaseModal = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [afterSubmitLoad, setAfterSubmitLoad] = useState(false);
  const rotateImageInterval = useRef();
  const images = [
    "/cures_articleimages/newsletter_images/floater.png",
    "/cures_articleimages/newsletter_images/floater1.png",
  ];

  const postSubscription = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid number!");
      return;
    }

    try {
      setAfterSubmitLoad(true);

      const response = await axios.post(
        `${backendHost}/users/subscribe/${phoneNumber}`,
        {
          nl_subscription_disease_id: "",
          nl_sub_type: 0,
          nl_subscription_cures_id: "",
          country_code: phoneNumber.slice(1, 3),
        }
      );

      setAfterSubmitLoad(false);

      if (response.data === 1) {
        alert("You have successfully subscribed to our Newsletter");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error(error);
      setAfterSubmitLoad(false);
      alert("Some error occurred! Please try again later.");
    }
  };

  const handleShow = () => {
    setShow(true);
    rotateImageInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
  };

  const handleClose = () => {
    clearInterval(rotateImageInterval.current);
    setShow(false);
  };

  useEffect(() => {
    const timer = setTimeout(handleShow, 8000);

    return () => {
      clearTimeout(timer);
      handleClose();
    };
  }, []);

  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-lg" id="diseaseModal">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <section className="appStore">
            <div className="container">
              <div className="row">
                <div
                  className="appStoreBg clearfix"
                  style={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <div className="col-md-6 col-sm-6 col-sx-12">
                    <div className="innerapp">
                      <div className="doc-img">
                        <img
                          src={
                            images.length > 0
                              ? `${imgKitImagePath}/tr:w-300,f-webp${images[currentIndex]}`
                              : `${process.env.PUBLIC_URL}/assets/img/doct.png`
                          }
                          alt="doctor"
                          style={{ maxHeight: "400px", width: "400px" }}
                        />
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
                        Get <span>doctor-approved</span> health tips, news, and
                        more
                      </div>
                      <div className="form-group relative">
                        <div className="aaa">
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            defaultCountry="IN"
                            onChange={setPhoneNumber}
                          />
                        </div>
                        <div>
                          <button
                            className="bcolor rounded py-2"
                            aria-label="Submit phone number for newsletter subscription"
                            onClick={postSubscription}
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
  );
};

export default DiseaseModal;

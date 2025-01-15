import React, { useEffect, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { backendHost } from "../../../api-config";

const DiseaseModal = ({
  modalState,

  currentIndexx,

  handleClose,

  postSubscription,
}) => {
  const [images, setImages] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const onPhoneNumberChange = (newValue) => {
    setPhoneNumber(newValue);
  };
  useEffect(() => {
    loadFloater();
  }, []);
  const loadFloater = async () => {
    await axios
      .get(`${backendHost}/data/newsletter/get`)
      .then((res) => {
        console.log(res.data);
        console.log("image");
        setImages(res.data);
      })
      .catch((res) => null);
    // console.log("1232121 testing");
  };

  return (
    <div
      className={`modal fade ${modalState ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
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
                        {images?.length > 0 ? (
                          <img
                            src={`https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp${images[currentIndexx]}`}
                            alt="doctor"
                            style={{ maxHeight: "400px", width: "405px" }}
                          />
                        ) : (
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/img/doct.png`}
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
                        Get <span>doctor-approved</span> health tips, news, and
                        more
                      </div>
                      <div className="form-group relative">
                        <div className="aaa">
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            defaultCountry="IN"
                            onChange={onPhoneNumberChange}
                          />
                        </div>
                        <div>
                          <button
                            className="bcolor rounded py-2"
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

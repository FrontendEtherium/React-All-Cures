import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";
import axios from "axios";
import { backendHost } from "../../../api-config";
import "./SubscriberComponent.css";

function SubscriberComponent({ disease = [], cures = [] }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "" });

  const handleSubscribe = () => {
    if (!isValidPhoneNumber(value)) {
      setAlert({ show: true, msg: "Please enter a valid phone number!" });
      setTimeout(() => setAlert({ show: false, msg: "" }), 5000);
      return;
    }
    setLoading(true);

    // Parse phone number using libphonenumber-js
    const phoneNumber = parsePhoneNumber(value);
    const countryCode = phoneNumber.countryCallingCode; // e.g., "91" for India
    const number = phoneNumber.nationalNumber; // e.g., "9876543210"

    axios
      .post(`${backendHost}/users/subscribe/${number}`, {
        nl_subscription_disease_id: disease.join(","),
        nl_sub_type: 1,
        nl_subscription_cures_id: cures.join(","),
        country_code: countryCode,
      })
      .then((res) => {
        let msg;
        if (res.data === "Subscribed")
          msg = "You have successfully subscribed!";
        else if (res.data === "Already subscribed")
          msg = "You are already subscribed!";
        else msg = "Some error occurred. Please try later.";
        setAlert({ show: true, msg });
      })
      .catch(() =>
        setAlert({ show: true, msg: "Some error occurred. Please try later." })
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      {alert.show && <div className="subscriber-alert">{alert.msg}</div>}
      <div className="subscriber-upper">
        <div className="subscriber-text">
          Sign up to receive the latest health updates, prevention tips and a
          weekly digest delivered straight to your inbox!
        </div>
        <div className="subscriber-form">
          <PhoneInput
            className="subscriber-input"
            placeholder="Enter your phone number"
            value={value}
            defaultCountry="IN"
            onChange={setValue}
          />
          <button
            className="subscriber-button"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="subscriber-policy">
        By signing up, you agree to the terms of use and privacy policy*
      </div>
    </div>
  );
}

export default SubscriberComponent;

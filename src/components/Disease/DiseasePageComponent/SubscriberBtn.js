import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import {
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Input,
} from "@material-ui/core";
import axiosInstance from "../../../axiosInstance";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { backendHost } from "../../../api-config";

const SubscriberBtn = () => {
  const [type, setType] = useState([]);
  const [disease, setDisease] = useState([]);
  const [cures, setCures] = useState([]);
  const [value, setValue] = useState("");
  const [diseaseList, setDiseaseList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customAlert, setAlert] = useState({
    showAlert: false,
    alertMsg: "",
  });
  // Fetch diseases on mount
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axiosInstance.get(
          `/article/all/table/disease_condition`
        );
        setDiseaseList(res.data || []);
      } catch (error) {
        console.error("Error fetching disease list", error);
      }
    };
    fetchDiseases();
  }, []);

  const handleSelect = useCallback((selectedOptions) => {
    const selectedValues = Array.from(selectedOptions).map(
      (option) => option.value
    );
    setType(selectedValues);
  }, []);

  const postSubscription = useCallback(async () => {
    if (!value) {
      Alert("Please enter a valid phone number!");
      return;
    }

    const phoneNumber = value.split("+")[1];
    const countryCodeLength = phoneNumber.length % 10;
    const countryCode = phoneNumber.slice(0, countryCodeLength);
    const StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, "");

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${backendHost}/users/subscribe/${StringValue}`,
        {
          nl_subscription_disease_id: disease.join(","),
          nl_sub_type: type.indexOf("1") === -1 ? 0 : 1,
          nl_subscription_cures_id: cures.join(","),
          country_code: countryCode,
        }
      );

      setIsLoading(false);
      console.log("response from subscriber", res.data);

      if (res.data === 1) {
        Alert("You have successfully subscribed to our Newsletter.");
        setIsModalOpen(false);
      } else if (res.data === "Already subscribed") {
        Alert("Number is already subscribed");
      }
    } catch (error) {
      setIsLoading(false);
      Alert("Some error occurred! Please try again later.");
    }
  }, [value, disease, type, cures, backendHost]);

  const Alert = (msg) => {
    setAlert({
      showAlert: true,
      alertMsg: msg,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        alertMsg: "",
      });
    }, 5000);
  };
  return (
    <>
      {/* Buttons */}
      {customAlert.showAlert && (
        <div
          className="alert alert-success pop-up border-bottom"
          style={{ zIndex: 999 }}
        >
          <div className="h5 mb-0 text-center">{customAlert.alertMsg}</div>
          <div className="timer"></div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "10px 0",
        }}
      >
        <button
          id="mobile-subscribe-fixed-btn"
          className="btn newsletter-icon rounded subscribe-btn newsletter_float"
          style={{
            backgroundColor: "#00415e",
            color: "#fff",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Subscribe
        </button>
        <Link to="/feedback">
          <button
            id="mobile-feedback-fixed-btn"
            style={{
              backgroundColor: "#00415e",
              color: "#fff",
            }}
            className="btn newsletter-icon rounded subscribe-btn newsletter_float"
          >
            Feedback
          </button>
        </Link>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ backgroundColor: "#00415e", color: "#fff" }}>
          Subscribe Your Disease/Cures Type
        </DialogTitle>
        <DialogContent style={{ padding: "30px" }}>
          <div className="subscribe-container">
            <Row>
              <Col>
                <div className="form-group">
                  <label>Select Type</label>
                  <select
                    multiple
                    value={type}
                    onChange={(e) => handleSelect(e.target.selectedOptions)}
                    className="form-control"
                  >
                    <option value="1">All</option>
                    <option value="2">Disease</option>
                    <option value="3">Cures</option>
                  </select>
                </div>

                {type.includes("2") && (
                  <div className="form-group">
                    <label>Select Disease</label>
                    <Select
                      multiple
                      value={disease}
                      onChange={(e) => setDisease(e.target.value)}
                      input={<Input />}
                      className="form-control"
                    >
                      {diseaseList.map((item) => (
                        <MenuItem key={item[0]} value={item[0]}>
                          {item[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}

                {type.includes("3") && (
                  <div className="form-group">
                    <label>Select Cure</label>
                    <Select
                      multiple
                      value={cures}
                      onChange={(e) => setCures(e.target.value)}
                      input={<Input />}
                      className="form-control"
                    >
                      {diseaseList.map((item) => (
                        <MenuItem key={item[0]} value={item[0]}>
                          {item[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
              </Col>
              <Col>
                <h2 className="text-dark">All Cures</h2>
                <p>
                  Sign up for our free <strong>All Cures</strong> Weekly
                  Newsletter.
                </p>
                <p>
                  Get <strong>doctor-approved</strong> health tips, news, and
                  more.
                </p>

                <div className="form-group">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    defaultCountry="IN"
                    onChange={(newValue) => setValue(newValue)}
                  />
                </div>

                {/* Centered Button */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#00415e",
                      color: "#fff", // Ensure the text is white
                      padding: "10px 20px",
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                    onClick={postSubscription}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} style={{ color: "#fff" }} />
                    ) : (
                      <h6 style={{ color: "#fff" }}>Submit</h6>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(SubscriberBtn);

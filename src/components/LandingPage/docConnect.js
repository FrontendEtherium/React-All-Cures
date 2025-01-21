import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";
import { Container, Button } from "react-bootstrap";
import dayjs from "dayjs";
import DailyIframe from "@daily-co/daily-js";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  StaticDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import { Alert } from "react-bootstrap";
import Heart from "../../assets/img/heart.png";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.primary.contrastText,
  },
}));

const DocPatientConnect = () => {
  const history = useHistory();

  const [state, setState] = useState({
    selectedDate: null,
    selectedTime: null,
    videoLink: null,
    availStatus: null,
    value: dayjs(),
    highlightedDays: [],
    unavailableDates: [],
    timeSlots: [],
    unbookedSlots: [],
    selectedTimeSlot: "",
    alert: false,
    alertBooking: false,
    bookingLoading: false,
    userAvailStatus: "",
    data: [],
    originalData: [],
    filteredData: [],
    docID: "",
    isLoaded: false,
    items: [],
    modalShow: false,
    docId: "",
    searchQuery: "",
    showAlert: false,
    appointmentAlert: false,
    signInAlert: false,
    signInAlertDocId: null,
    amount: null,
  });

  useEffect(() => {
    getFeaturedDoctors();
    fetchData();
  }, []);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const bookAppn = (e) => {
    e.preventDefault();
    console.log("clicked booking");
    console.log("time", dayjs(state.selectedTime).format("HH:mm"));

    axios
      .post(`${backendHost}/appointments/create`, {
        docID: state.docId,
        userID: parseInt(userId),
        appointmentDate: state.selectedDate,
        startTime: state.selectedTimeSlot,
        paymentStatus: 0,
        amount: state.amount,
        currency: "INR",
      })
      .then((res) => {
        let enc = res.data;
        const responseObject = JSON.parse(JSON.stringify(enc));

        localStorage.setItem("encKey", responseObject.encRequest);
        localStorage.setItem("apiResponse", JSON.stringify(res.data));

        if (res.data.Count === 0) {
          updateState({ appointmentAlert: true });
          setTimeout(() => updateState({ appointmentAlert: false }), 6000);
        } else {
          const redirectURL =
            "https://www.all-cures.com/paymentRedirection" +
            `?encRequest=${responseObject.encRequest}` +
            `&accessCode=AVWN42KL59BP42NWPB`;

          window.location.href = redirectURL;
        }
      })
      .catch((err) => console.error(err));
  };

  const getFeaturedDoctors = () => {
    // Fetch logic if needed
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendHost}/video/get/doctors/list`);
      const json = await response.json();
      updateState({
        data: json,
        filteredData: json,
        originalData: json,
        isLoaded: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    updateState({
      searchQuery: event.target.value,
      showAlert: false,
    });
  };

  const handleSearch = () => {
    const { searchQuery, originalData } = state;
    const filteredData = originalData.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredData.length === 0) {
      updateState({ filteredData: originalData, showAlert: true });
      setTimeout(() => updateState({ showAlert: false }), 6000);
    } else {
      updateState({ filteredData, showAlert: false });
    }
  };

  const handleDatesChange = (newValue) => {
    updateState({
      value: newValue,
      selectedDate: newValue.format("YYYY-MM-DD"),
    });

    fetch(`${backendHost}/appointments/get/Slots/14485`)
      .then((res) => res.json())
      .then((json) => {
        const unbookedSlots = json.unbookedSlots[state.selectedDate] || [];
        updateState({ unbookedSlots, amount: json.amount });
      });
  };

  const handleTimeSlot = (time) => {
    updateState({ selectedTimeSlot: time });
  };

  const renderDoctors = () => {
    const { filteredData, showAlert } = state;
    const sortedData = filteredData.sort(
      (a, b) => b.videoService - a.videoService
    );

    if (!state.isLoaded) {
      return (
        <>
          <Header history={history} />
          <div className="loader my-4">
            <img src={Heart} alt="All Cures Logo" id="heart" />
          </div>
          <Footer />
        </>
      );
    }

    return (
      <div>
        <Header history={history} />
        <div className="row ml-2 mt-5 d-flex justify-content-center">
          <div className="col-md-3">
            <input
              type="text"
              value={state.searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search Available Doctors"
              className="form-control"
            />
          </div>
          <div className="col-md-2 mt-2">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        {showAlert && (
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <div style={{ width: "50%" }}>
              <Alert variant="warning" className="h6 mx-3 text-center">
                Doctor not found!!!
              </Alert>
            </div>
          </div>
        )}

        {sortedData.map((d) => (
          <div
            key={d.id}
            className="card shadow-sm mt-2 mb-4 docPatientCard d-flex justify-content-center align-items-center"
          >
            <div className="card-body">
              <p>
                Dr. {d.firstName} {d.lastName}
              </p>
            </div>
          </div>
        ))}
        <Footer />
      </div>
    );
  };

  return renderDoctors();
};

export default DocPatientConnect;

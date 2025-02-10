import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";

import "./Bookings.css";

const Bookings = () => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState([]);

  // Retrieve doctor ID if logged in as doctor; else handle user
  const docID = localStorage.getItem("doctorid");

  // Fetch appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendHost}/appointments/get/user/${userId}`
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching user appointments:", error);
      }
    };

    const fetchDocData = async () => {
      try {
        const response = await fetch(
          `${backendHost}/appointments/get/${docID}`
        );
        const json = await response.json();
        setDocData(json);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
      }
    };

    if (docID) {
      fetchDocData();
    } else {
      fetchData();
    }
  }, [docID]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Tabs utility for MUI
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // Reusable card for each appointment
  const AppointmentCard = ({ appointment, isDoctor }) => {
    // Decide how to display name:
    //   if isDoctor => show userName
    //   else => show doctorName
    const displayName = isDoctor
      ? appointment.userName
      : `Dr. ${appointment.doctorName}`;
    const { appointmentDate, startTime, endTime, status } = appointment;

    // Optional: show a status text or badge
    // 0 => Upcoming
    // 2 => Completed
    const statusText =
      status === 0 ? "Upcoming" : status === 2 ? "Completed" : "Other";

    return (
      <div className="card shadow-sm booking-card">
        <div className="card-body d-flex align-items-center">
          <div className="avatar">
            <i className="fas fa-user-md"></i>
          </div>
          <div className="booking-info">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="doctor-name">{displayName}</h5>
              <span
                className={`status-badge ${
                  status === 0
                    ? "status-upcoming"
                    : status === 2
                    ? "status-completed"
                    : ""
                }`}
              >
                {statusText}
              </span>
            </div>
            <div className="time-slot mb-1">
              <strong>Date:</strong> {appointmentDate}
            </div>
            <div className="time-slot">
              <strong>Time:</strong> {startTime} - {endTime}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header history={history} />

      <div className="bookings-page container">
        {/* Tab Section */}
        <Box sx={{ width: "100%", mt: 5 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab label="Upcoming Meetings" {...a11yProps(0)} />
              <Tab label="Completed Meetings" {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/* Upcoming */}
          <CustomTabPanel value={value} index={0}>
            {/* If doc is logged in, show docData appointments, else show data */}
            {docID
              ? docData
                  .filter((d) => d.status === 0)
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      isDoctor
                    />
                  ))
              : data
                  .filter((d) => d.status === 0)
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
          </CustomTabPanel>

          {/* Completed */}
          <CustomTabPanel value={value} index={1}>
            {docID
              ? docData
                  .filter((d) => d.status === 2)
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      isDoctor
                    />
                  ))
              : data
                  .filter((d) => d.status === 2)
                  .map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
          </CustomTabPanel>
        </Box>
      </div>

      <Footer />
    </div>
  );
};

export default Bookings;

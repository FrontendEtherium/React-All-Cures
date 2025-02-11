import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import axios from "axios";
import { backendHost } from "../api-config";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Custom Day Highlighting
const CustomDay = styled(PickersDay)(({ theme, day, selectedDate }) => ({
  ...(selectedDate &&
    day.format("YYYY-MM-DD") === selectedDate && {
      backgroundColor: "#00415e", // Custom selected background
      color: "#fff", // White text
      borderRadius: "50%", // Circular styling
      "&:hover": {
        backgroundColor: "#00314b", // Slightly darker hover color
      },
    }),
}));

const AppointmentModal = ({
  show,
  onHide,

  alertBooking,
  docId,
  userId,
}) => {
  const today = dayjs();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [unbookedSlots, setUnbookedSlot] = useState(null);

  const handleTimeSlot = (time) => {
    setSelectedTimeSlot(time);
  };

  const disableDate = (date) => {
    const currentDate = new Date();
    const isPastDate = date < currentDate;
    // const isBooked = highlightedDays.includes(date.format("YYYY-MM-DD"));
    // const isUnavail = unavailableDates.includes(date.format("YYYY-MM-DD"));
    // return isBooked || isUnavail;
  };
  useEffect(() => {
    console.log("Booking started");
    
    const fetchAppointmentDetails = () => {
      fetch(`${backendHost}/appointments/get/Slots/${docId}`)
        .then((res) => res.json())
        .then((json) => {
          const firstDate = Object.keys(json.totalDates)[0];

          // Extract the timeslots for the first date
          const timeslots = json.totalDates[firstDate];

          const highlightedDate = json.completelyBookedDates;
          setHighlightedDays(highlightedDate);

          const totalDates = Object.keys(json.totalDates);

          const generateDateRange = (startDate, endDate) => {
            const dates = [];
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
              dates.push(currentDate.toISOString().slice(0, 10));
              currentDate = new Date(
                currentDate.getTime() + 24 * 60 * 60 * 1000
              );
            }
            return dates;
          };

          // Generate all possible dates for the next 30 days
          const currentDate = new Date();
          const next30Days = new Date(
            currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
          );
          const allPossibleDates = generateDateRange(currentDate, next30Days);

          // Find the missing dates
          const missingDates = allPossibleDates.filter(
            (date) => !totalDates.includes(date)
          );

          // console.log('missing dates',missingDates)
          setUnavailableDates(missingDates);

          const unbookedSlots = json.unbookedSlots[selectedDate] || [];

          // Set the state of unbookedSlots using the extracted unbooked slots
          setAmount(json.amount);
          setUnbookedSlot(unbookedSlots);
        });
    };
    fetchAppointmentDetails();
  }, [selectedDate]);

  const bookAppn = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${backendHost}/appointments/create`, {
        docID: docId,
        userID: parseInt(userId),
        appointmentDate: selectedDate,
        startTime: selectedTimeSlot,
        paymentStatus: 0,
        amount: amount,
        currency: "INR",
      });

      const responseObject = response.data;
      localStorage.setItem("encKey", responseObject.encRequest);
      localStorage.setItem("apiResponse", JSON.stringify(response.data));

      const redirectURL = `https://www.all-cures.com/paymentRedirection?encRequest=${responseObject.encRequest}&accessCode=AVWN42KL59BP42NWPB`;
      window.location.href = redirectURL;
    } catch (error) {
      console.error("Error while booking appointment:", error);
      setError("Failed to book the appointment. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDatesChange = (newValue) => {
    setSelectedDate(newValue.format("YYYY-MM-DD"));
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{
        display: show ? "block" : "none",
        position: "fixed", // Ensures it's positioned relative to the viewport
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1050, // Ensure it appears above other elements
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" style={{}} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold mt-2 ml-2">
              Schedule Your Appointment
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={onHide}
              style={{ marginRight: "1px" }}
            >
              <span>&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row">
              {/* Date Picker */}
              <div className="col-12 col-md-6 mb-3 text-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <StaticDatePicker
                      defaultValue={today}
                      minDate={today}
                      maxDate={today.add(1, "month")}
                      slots={{
                        actionBar: () => null,
                        day: (props) => (
                          <CustomDay
                            {...props}
                            selected={
                              selectedDate &&
                              props.day.format("YYYY-MM-DD") === selectedDate
                            }
                          />
                        ),
                      }}
                      slotProps={{ day: { highlightedDays } }}
                      onChange={handleDatesChange}
                      showToolbar={false}
                      shouldDisableDate={disableDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              {/* Time Slot Section */}
              <div className="col-12 col-md-6 p-3">
                {selectedDate && (
                  <>
                    <p className="font-weight-bold mb-2 text-center">
                      Select a Time Slot:
                    </p>
                    <div
                      className="d-flex flex-wrap justify-content-center"
                      style={{
                        gap: "10px",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      {unbookedSlots.map((time, index) => {
                        const [hours, minutes] = time.split(":").map(Number);
                        const suffix = hours >= 12 ? "PM" : "AM";
                        const adjustedHours = hours % 12 || 12;
                        const formattedTime = `${adjustedHours}:${
                          minutes < 10 ? "0" : ""
                        }${minutes} ${suffix}`;

                        return (
                          <Button
                            key={index}
                            onClick={() => handleTimeSlot(time)}
                            style={{
                              minWidth: "80px",
                              backgroundColor:
                                selectedTimeSlot === time
                                  ? "#00415e"
                                  : "transparent",
                              color:
                                selectedTimeSlot === time ? "#fff" : "#00415e",
                              border: `1px solid ${
                                selectedTimeSlot === time
                                  ? "#00415e"
                                  : "#00415e"
                              }`,
                              borderRadius: "5px",
                            }}
                            onMouseEnter={(e) => {
                              if (selectedTimeSlot !== time)
                                e.target.style.backgroundColor = "#e6f0f8";
                            }}
                            onMouseLeave={(e) => {
                              if (selectedTimeSlot !== time)
                                e.target.style.backgroundColor = "transparent";
                            }}
                          >
                            {formattedTime}
                          </Button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Selected Date and Time */}
            <div className="text-center p-3 bg-light rounded">
              {selectedDate && (
                <div className="mb-2">
                  <strong style={{ color: "#00415e" }}>
                    {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
                  </strong>
                </div>
              )}
              {selectedTimeSlot && (
                <div className="mb-2 text-success">
                  <strong>Time: {selectedTimeSlot}</strong>
                </div>
              )}
            </div>

            {/* Book Appointment Button */}
            {selectedTimeSlot && (
              <div className="text-center mt-3 ">
                <Button
                  variant="dark"
                  onClick={bookAppn}
                  style={{
                    background: "#00415e",
                    color: "#fff",
                    marginBottom: "10px",
                    padding: "10px",
                  }}
                >
                  Book Appointment
                </Button>
              </div>
            )}

            {/* Alerts */}
            {bookingLoading && (
              <Alert variant="info" className="text-center mt-3">
                Booking your appointment...
              </Alert>
            )}
            {alertBooking && (
              <Alert variant="success" className="text-center mt-3">
                Appointment booked successfully!
              </Alert>
            )}
            {error && (
              <Alert variant="danger" className="text-center mt-3">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

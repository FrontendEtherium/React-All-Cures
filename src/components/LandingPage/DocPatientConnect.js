import React, { Component } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, withRouter } from "react-router-dom";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";
import { userAccess } from "../UserAccess";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from "dayjs";
import { subDays, isBefore, addDays } from 'date-fns';
import DailyIframe from '@daily-co/daily-js';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker, TimePicker } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import moment from 'moment'
import Heart from "../../assets/img/heart.png";
import Test from './test';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.primary.contrastText,
  },
}));

class ServerDay extends Component {
  render() {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = this.props;
    const isSelected = !this.props.outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));
    return (
      <HighlightedDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} selected={isSelected} />
    );
  }
}

class DocPatientConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: null,
      callFrame: null,
      videoLink: null,
      availStatus: null,
      value: dayjs(),
      highlightedDays: [],
      unavailableDates: [],
      timeSlots: [],
      unbookedSlots: [],
      selectedTimeSlot: '',
      alert: false,
      alertBooking: false,
      bookingLoading: false,
      userAvailStatus: '',
      data: [],
      originalData: [],
      filteredData: [],
      docID: '',
      isLoaded: false,
      items: [],
      modalShow: false,
      docId: '',
      searchQuery: "",
      showAlert: false,
      appointmentAlert: false
    };
  }

  componentDidMount() {
    this.getFeaturedDoctors();
    this.fetchData();
  }

  bookAppn = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/appointments/create`, {
      "docID": this.state.docId,
      "userID": parseInt(userId),
      "appointmentDate": this.state.selectedDate,
      "startTime": this.state.selectedTimeSlot,
      "paymentStatus": 0,
      "amount": "1.00",
      "currency": "INR",
    })
    .then((res) => {
      let enc = res.data;
      const responseObject = JSON.parse(JSON.stringify(enc));
      localStorage.setItem('encKey', responseObject.encRequest);
      localStorage.setItem('apiResponse', JSON.stringify(res.data));
      if (res.data.Count == 0) {
        this.setState({ appointmentAlert: true });
        setTimeout(() => {
          this.setState({ appointmentAlert: false });
        }, 6000);
      } else {
        const redirectURL = `https://www.all-cures.com/paymentRedirection?encRequest=${responseObject.encRequest}&accessCode=AVWN42KL59BP42NWPB`;
        window.location.href = redirectURL;
      }
    });
  }

  getFeaturedDoctors = () => {
    // Fetch featured doctors
  };

  fetchData = async () => {
    try {
      const response = await fetch(`${backendHost}/video/get/doctors/list`);
      const json = await response.json();
      this.setState({ data: json, filteredData: json, originalData: json, isLoaded: true });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  getDocId = (id) => {
    this.setState({ docId: id });
    this.fetchAvailStatus(id);
    this.fetchAppointmentDetails(id);
  }

  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value, showAlert: false });
  }

  handleSearch = () => {
    const { searchQuery, originalData } = this.state;
    const filteredData = originalData.filter((doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredData.length === 0) {
      this.setState({ filteredData: originalData, showAlert: true });
      setTimeout(() => { this.setState({ showAlert: false }); }, 6000);
    } else {
      this.setState({ filteredData, showAlert: false });
    }
  };

  handleDatesChange = (newValue) => {
    this.setState({ value: newValue, selectedDate: newValue.format("YYYY-MM-DD") });
    fetch(`${backendHost}/appointments/get/Slots/14485`)
    .then((res) => res.json())
    .then((json) => {
      const totalDates = Object.keys(json.totalDates);
      const unbookedSlots = json.unbookedSlots[this.state.selectedDate] || [];
      const currentDate = new Date();
      const next30Days = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const allPossibleDates = this.generateDateRange(currentDate, next30Days);
      const missingDates = allPossibleDates.filter(date => !totalDates.includes(date));

      this.setState({
        timeSlots: json.totalDates[this.state.selectedDate] || [],
        highlightedDays: json.completelyBookedDates,
        unbookedSlots,
        unavailableDates: missingDates
      });
    });
  };

  handleTimeChange = (newTime) => {
    this.setState({ selectedTime: newTime });
  };

  handleTimeSlot = (time) => {
    this.setState({ selectedTimeSlot: time });
  };

  fetchAvailStatus = (id) => {
    fetch(`${backendHost}/video/get/${id}/availability`)
    .then((res) => res.json())
    .then((json) => {
      this.setState({ availStatus: json });
    });
  };

  fetchAppointmentDetails = (id) => {
    fetch(`${backendHost}/appointments/get/Slots/${id}`)
    .then((res) => res.json())
    .then((json) => {
      const totalDates = Object.keys(json.totalDates);
      const unbookedSlots = json.unbookedSlots[this.state.selectedDate] || [];
      const currentDate = new Date();
      const next30Days = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const allPossibleDates = this.generateDateRange(currentDate, next30Days);
      const missingDates = allPossibleDates.filter(date => !totalDates.includes(date));

      this.setState({
        timeSlots: json.totalDates[this.state.selectedDate] || [],
        highlightedDays: json.completelyBookedDates,
        unbookedSlots,
        unavailableDates: missingDates
      });
    });
  };

  generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    }
    return dates;
  };

  render() {
    const { value, highlightedDays, filteredData, searchQuery } = this.state;
    const today = dayjs();
    const { selectedDate, selectedTime } = this.state;
    const sortedData = filteredData.sort((a, b) => b.videoService - a.videoService);

    if (!this.state.isLoaded) {
      return (
        <>
          <Header history={this.props.history} />
          <div className="loader my-4">
            <img src={Heart} alt="All Cures Logo" id="heart" />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <div>
          <Header history={this.props.history} />

          <div className="row ml-2 mt-5 d-flex justify-content-center">
            <div className="col-md-3">
              <input
                type="text"
                value={searchQuery}
                onChange={this.handleSearchInputChange}
                placeholder='Search Available Doctors'
                className="form-control"
              />
            </div>
            <div className="col-md-2 mt-2">
              <button className="btn btn-primary" onClick={this.handleSearch}>Search</button>
            </div>
          </div>

          {this.state.showAlert && (
            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
              <div style={{ width: "50%" }}>
                <Alert variant="warning" className="h6 mx-3 text-center">Doctor not found!!!</Alert>
              </div>
            </div>
          )}

          {sortedData && sortedData.map((d) => {
            return (
              <div className="d-flex justify-content-center align-items-center">
                <div key={d.id} className="card shadow-sm mt-2 mb-4 docPatientCard">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="mr-5">
                        <div className="mb-2 bookings">
                          <p>
                            <span className="fw-bold">Dr. {d.firstName} {d.lastName}</span>
                          </p>
                        </div>
                        <div className="mb-2 bookings">
                          <p>{d.hospitalAffiliated}</p>
                        </div>
                        <div className="mb-2 bookings">
                          {!userId &&
                            <button
                              type="button"
                              className="btn btn-primary bg-dark"
                              onClick={() => this.setState({ modalShow: true })}
                            >
                              Schedule
                            </button>
                          }
                          <Test
                            show={this.state.modalShow}
                            path={this.state.path}
                            onHide={() => this.setState({ modalShow: false })}
                          />
                          {userId && d.videoService === 1 ? (
                            <button
                              type="button"
                              className="btn btn-primary bg-dark"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => this.getDocId(d.docID)}
                            >
                              Schedule
                            </button>
                          ) : (
                            userId && d.videoService === 0 ? (
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                onClick={() => this.getDocId(d.docID)}
                              >
                                Schedule
                              </button>
                            ) : null
                          )}
                          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                              <div className="modal-content">
                                <div className="modal-header"></div>
                                <div className="modal-body p-3">
                                  🚫 This doctor is not available right now. We will get back to you ASAP. Meanwhile, check the doctor's profile to read articles and know more about him. 📄👨‍⚕️
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button type="button" className="btn btn-primary">
                                    <Link to={`/doctor/${this.state.docId}`} className="text-white">Go to Doctor's Profile</Link>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bookings-img text-center ml-auto flex-end">
                        <i className="fas fa-user-md fa-6x" style={{ width: "100%", maxWidth: "100px" }}></i>
                      </div>
                      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content" style={{ minWidth: "600px" }}>
                            <div className="modal-header">
                              <h5 className="modal-title p-3 font-weight-bold" id="exampleModalLabel">Schedule your Appointment</h5>
                              <button type="button" className="close appn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body" style={{ minHeight: "500px" }}>
                              <div className="row">
                                <div className="col-md-8">
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker", "TimePicker"]}>
                                      <StaticDatePicker
                                        defaultValue={today}
                                        minDate={today}
                                        maxDate={today.add(1, "month")}
                                        slots={{ day: ServerDay }}
                                        slotProps={{ day: { highlightedDays } }}
                                        onChange={this.handleDatesChange}
                                        showToolbar={false}
                                        shouldDisableDate={this.disableDate}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </div>
                                <div className="col-sm-12 col-md-4 p-5">
                                  {this.state.selectedDate &&
                                    <>
                                      <p>Select Time Slot</p>
                                      {this.state.timeSlots && this.state.timeSlots.map((time, index) => {
                                        const isUnbooked = this.state.unbookedSlots.includes(time);
                                        const isSelected = this.state.selectedTimeSlot === time;
                                        const [hours, minutes] = time.split(':');
                                        const currentDate = new Date();
                                        const currentDateString = currentDate.toDateString();
                                        const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
                                        const selectedDate = new Date(this.state.selectedDate);
                                        const selectedDateString = selectedDate.toDateString();
                                        const isToday = currentDateString === selectedDateString;
                                        const timeSlotTime = parseInt(hours) * 60 + parseInt(minutes);
                                        const isPast = isToday && timeSlotTime < currentTime;
                                        return (
                                          <div className="row pt-2" key={index}>
                                            <div className="col-md-6">
                                              <div style={{ minWidth: "100px" }}>
                                                <Button
                                                  variant={isSelected ? "primary" : (isUnbooked ? "outline-primary" : "outline-danger")}
                                                  disabled={!isUnbooked || isPast}
                                                  className="w-100 d-block"
                                                  onClick={() => this.handleTimeSlot(time)}
                                                >
                                                  {time}
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </>
                                  }
                                </div>
                              </div>
                              <div>
                                {this.state.selectedDate &&
                                  <p className="ml-4 my-2" style={{ fontSize: "18px" }}>
                                    Date: {dayjs(this.state.selectedDate).format("YYYY-MM-DD")}
                                  </p>
                                }
                                {this.state.selectedTimeSlot &&
                                  <p className="ml-4 my-2" style={{ fontSize: "18px" }}>
                                    Time: {this.state.selectedTimeSlot}
                                  </p>
                                }
                              </div>
                              {this.state.selectedTimeSlot &&
                                <Button variant="dark" onClick={this.bookAppn} className="p-2 m-4">Book Appointment</Button>
                              }
                              {this.state.bookingLoading &&
                                <Alert variant="danger" className="h6 mx-3">Please wait while we book your Appointment!!</Alert>
                              }
                              {this.state.appointmentAlert &&
                                <Alert variant="success" className="h6 mx-3">Booked successfully!! Check your Email.</Alert>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Footer />
        </div>
      );
    }
  }
}

export default withRouter(DocPatientConnect);

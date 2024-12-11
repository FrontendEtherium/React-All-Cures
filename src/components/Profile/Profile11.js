import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Rating from "../StarRating";
import Doct from "../../assets/img/doct.png";
import "../../assets/healthcare/css/main.css";
import "../../assets/healthcare/css/responsive.css";
import "../../assets/healthcare/css/animate.css";
import "../../assets/healthcare/icomoon/style.css";
import { Container, Button, Modal } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import EditProfile from "./EditProfile";
import { backendHost } from "../../api-config";
import Comment from "../Comment";

import "../../assets/healthcare/css/mobile.css";
// import ArticleComment from '../ArticleComment';
import { userId } from "../UserId";
import { userAccess } from "../UserAccess";
import AllPost from "../BlogPage/Allpost";
import Heart from "../../assets/img/heart.png";
import { Alert } from "react-bootstrap";

import HelmetMetaData from "../HelmetMetaData";
import { imagePath } from "../../image-path";
import Chat from "./Chat";

// import Calendar from 'react-calendar';
import dayjs from "dayjs";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";

import DailyIframe from "@daily-co/daily-js";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";

import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
import Test from "../LandingPage/test";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.primary.contrastText,
  },
}));

const ServerDay = ({
  highlightedDays = [],
  day,
  outsideCurrentMonth,
  ...other
}) => {
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));
  return (
    <HighlightedDay
      {...other}
      day={day}
      selected={isSelected}
      outsideCurrentMonth={outsideCurrentMonth}
    />
  );
};
function Profile() {
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    items: [],
    articleItems: [],
    comment: [],
    ratingValue: "",
    rating: [],
    highlightedDays: [],
    unavailableDates: [],
    timeSlots: [],
    unbookedSlots: [],
    selectedDate: null,
    selectedTimeSlot: "",
    isLoaded: false,
    modalShow: false,
    showAlert: false,
    alertMsg: "",
    bookingLoading: false,
    alertBooking: false,
    docid: null,
    initial: 4,
    value: dayjs(),
  });
  const [callFrame, setCallFrame] = useState(null);

  useEffect(() => {
    fetchDoctorData();
    fetchAvailStatus();
    fetchUserAvailStatus();
    fetchAppointmentDetails();
    getComments();
    getRating();
    getRate();
    allPosts();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/DoctorsActionController?DocID=${
          id.split("-")[0]
        }&cmd=getProfile`
      );
      setState((prev) => ({
        ...prev,
        isLoaded: true,
        items: response.data,
        docid: response.data.docID,
      }));
    } catch (err) {
      console.error("Error fetching doctor data:", err);
    }
  };

  const fetchAvailStatus = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/video/get/${id.split("-")[0]}/availability`
      );
      setState((prev) => ({ ...prev, availStatus: response.data }));
    } catch (err) {
      console.error("Error fetching availability status:", err);
    }
  };

  const fetchUserAvailStatus = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/appointments/get/${id.split("-")[0]}/${userId}`
      );
      const availability = response.data.some((appointment) => {
        const currentDate = new Date();
        const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        return (
          appointment.appointmentDate ===
            currentDate.toISOString().split("T")[0] &&
          currentTime >= appointment.startTime &&
          currentTime <= appointment.endTime
        );
      });
      setState((prev) => ({ ...prev, userAvailStatus: availability ? 1 : 0 }));
    } catch (err) {
      console.error("Error fetching user availability status:", err);
    }
  };

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/appointments/get/Slots/${id.split("-")[0]}`
      );
      const totalDates = Object.keys(response.data.totalDates);
      const highlightedDays = response.data.completelyBookedDates || [];
      const unavailableDates = getUnavailableDates(totalDates);

      setState((prev) => ({
        ...prev,
        timeSlots: response.data.totalDates[totalDates[0]] || [],
        highlightedDays,
        unavailableDates,
      }));
    } catch (err) {
      console.error("Error fetching appointment details:", err);
    }
  };

  const getUnavailableDates = (availableDates) => {
    const currentDate = new Date();
    const next30Days = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );
    const allPossibleDates = generateDateRange(currentDate, next30Days);

    return allPossibleDates.filter((date) => !availableDates.includes(date));
  };

  const generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/rating/target/${id.split("-")[0]}/targettype/1`
      );
      const filteredComments = response.data.filter(
        (comment) => comment.reviewed === 1 && comment.comments !== "null"
      );
      setState((prev) => ({ ...prev, comment: filteredComments }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const getRating = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/rating/target/${id.split("-")[0]}/targettype/1/avg`
      );
      setState((prev) => ({ ...prev, ratingValue: response.data }));
    } catch (err) {
      console.error("Error fetching rating:", err);
    }
  };

  const getRate = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/rating/target/${
          id.split("-")[0]
        }/targettype/1?userid=${userId}`
      );
      setState((prev) => ({
        ...prev,
        rating: response.data[0]?.ratingVal || "",
      }));
    } catch (err) {
      console.error("Error fetching user rating:", err);
    }
  };

  const allPosts = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${
          id.split("-")[0]
        }?offset=0&limit=${state.initial}`
      );
      console.log("all post fetched", response.data);

      const articles = response.data.filter(
        (article) => article.pubstatus_id === 3
      );
      setState((prev) => ({
        ...prev,
        articleItems: [...prev.articleItems, ...articles],
        initial: prev.initial + 4,
      }));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const initVideoChat = async () => {
    try {
      const response = await axios.get(
        `${backendHost}/video/create/room/${id.split("-")[0]}`
      );
      if (!callFrame && response.data !== "Error") {
        const newCallFrame = DailyIframe.createFrame({ showLeaveButton: true });
        newCallFrame.join({ url: response.data });
        newCallFrame.on("left-meeting", () => {
          newCallFrame.destroy();
          setCallFrame(null);
        });
        setCallFrame(newCallFrame);
      }
    } catch (err) {
      console.error("Error initializing video chat:", err);
    }
  };
  const changeHandler = (event) => {
    const file = event.target.files[0];

    if (file.size > 1048576) {
      Alert("Image should be less than 1MB!");
      return;
    }

    setState((prevState) => ({
      ...prevState,
      selectedFile: file,
    }));

    handleImageSubmission(file);
  };
  const handleImageSubmission = (file, setState, Alert) => {
    setState((prev) => ({ ...prev, imageUploadLoading: true }));

    const formData = new FormData();
    formData.append("File", file);

    fetch(`${backendHost}/dashboard/imageupload/doctor/${id.split("-")[0]}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isFilePicked: true,
            imageUploadLoading: false,
          }));
        }, 5000);

        Alert("Image uploaded successfully.");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const showComments = (item, i) => {
    return (
      <div className="col-12" key={i}>
        <div className="card my-4">
          <div className="card-body">
            <h5 className="h6">{item.comments}</h5>
            <div className="card-info">
              <h6 className="card-subtitle mb-2 text-muted">
                <b>By: </b> {item.first_name} {item.last_name}
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const bookAppointment = async () => {
    try {
      const response = await axios.post(`${backendHost}/appointments/create`, {
        docID: state.docid,
        userID: parseInt(userId),
        appointmentDate: state.selectedDate,
        startTime: state.selectedTimeSlot,
        paymentStatus: 0,
        amount: "1.00",
        currency: "INR",
      });
      const redirectURL = `https://www.all-cures.com/paymentRedirection?encRequest=${response.data.encRequest}&accessCode=AVWN42KL59BP42NWPB`;
      window.location.href = redirectURL;
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };
  const [modalShow, setModalShow] = useState();
  const {
    items,
    isLoaded,
    selectedDate,
    selectedTimeSlot,
    timeSlots,
    unbookedSlots,
  } = state;
  const [alertVisible, setAlertVisible] = useState();
  if (!isLoaded) {
    return (
      <>
        <Header history={history} />
        <div className="loader my-4">
          <img src={Doct} alt="Loading" />
        </div>
        <Footer />
      </>
    );
  }

  const handleDatesChange = (newValue) => {
    const formattedDate = newValue.format("YYYY-MM-DD");

    setState((prevState) => ({
      ...prevState,
      selectedDate: formattedDate,
      value: newValue,
    }));

    fetch(`${backendHost}/appointments/get/Slots/${state.docid}`)
      .then((res) => res.json())
      .then((json) => {
        const unbookedSlotsForDate = json.unbookedSlots[formattedDate] || [];
        const timeSlotsForDate = json.totalDates[formattedDate] || [];

        setState((prevState) => ({
          ...prevState,
          unbookedSlots: unbookedSlotsForDate,
          timeSlots: timeSlotsForDate,
        }));
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  };

  const today = dayjs();
  return (
    <div>
      <HelmetMetaData
        title={`${items.prefix} ${items.firstName} ${items.lastName}`}
        description={items.about}
        image={`${imagePath}/cures_articleimages/doctors/${items.docID}.png`}
        keywords={`${items.firstName} ${items.lastName}`}
      />
      <Header history={history} />
      <section className="Profileleft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 pd-0">
              <div className="profile-card clearfix">
                <div className="col-md-3">
                  <div className="profileImageBlok">
                    <div
                      className="profile-card-img text-center"
                      id="profile-card-img"
                    >
                      {/* Example loader implementation */}
                      {state.imageUploadLoading ? (
                        <div className="loader">
                          <img src={Heart} alt="All Cures Logo" id="heart" />
                        </div>
                      ) : null}

                      <h1 style={{ display: "none" }}>
                        All Cures is a product developed, managed, and owned by
                        Etherium Technologies. Our mission is to make it simple
                        and convenient for users to get information on Cures
                        from anywhere in the world. Our belief is that your
                        wellness is your well-being. We are passionate about
                        giving our users the unique experience that is both
                        fulfilling and wholesome.
                      </h1>
                      <h2 style={{ display: "none" }}>
                        Ayurveda, Homeopathy, Chinese Medicine, Persian, Unani
                      </h2>
                      {state.items.imgLoc ? (
                        <img
                          alt={state.items.firstName}
                          src={`https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-180,h-230,f-webp${state.items.imgLoc}`}
                        />
                      ) : (
                        <i className="fas fa-user-md fa-6x"></i>
                      )}
                    </div>

                    {/* Show the file input only if the user has permission */}
                    {id.split("-")[0] === userId || userAccess === 9 ? (
                      <>
                        <label htmlFor="fileInput" className="image-edit-icon">
                          <i className="fas fa-edit fa-2x"></i>
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          name="file"
                          onChange={changeHandler}
                          required
                        />
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="profile-info">
                    <div className="profile-infoL-card">
                      <div className="profile-info-name" id="DocDetails">
                        <div className="h4 font-weight-bold">
                          {state.items.prefix} {state.items.firstName}{" "}
                          {state.items.middleName} {state.items.lastName}
                          {/* {state.ratingValue && (
                            <div className="mt-2 mb-4" id="doctor-avg-rating">
                              {[...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  className="fa fa-star opacity-7"
                                ></span>
                              ))}
                            </div>
                          )} */}
                        </div>
                        <div className="h5 text-capitalize">
                          <i className="fas fa-award pr-1"></i>
                          {state.items.primarySpl}
                        </div>
                        <div className="h5">{state.items.experience}</div>
                        <div className="h5 text-capitalize">
                          <i className="fas fa-hospital pr-1"></i>
                          {state.items.hospitalAffiliated} {state.items.country}
                        </div>
                      </div>
                    </div>
                    <div className="rating-reviews">
                      <div className="profile-info-rating">
                        <h2>
                          <form className="rating"></form>
                        </h2>
                      </div>
                      <div className="reviews">
                        {(userAccess === "9" ||
                          parseInt(userId) === parseInt(id.split("-")[0])) && (
                          <Button
                            variant="dark"
                            onClick={() =>
                              setState({ ...state, modalShow: true })
                            }
                          >
                            Edit Profile
                          </Button>
                        )}

                        {state.items.videoService == 1 && (
                          <button
                            type="button"
                            className="btn btn-primary bg-success border-0 ml-2 "
                            onClick={() => {
                              if (userId) {
                                // User is logged in, show the modal
                                document
                                  .getElementById("exampleModal")
                                  .classList.add("show");
                                document.getElementById(
                                  "exampleModal"
                                ).style.display = "block";
                                document.body.classList.add("modal-open");
                              } else {
                                // User is not logged in, show an alert
                                console.log("user id not available");
                                alert(
                                  " You need to log in to book a consultation. Please log in or create an account to proceed."
                                );
                                // <Test
                                //   show={true}
                                //   onHide={() => this.setModalShow(false)}
                                // />;
                              }
                            }}
                          >
                            <VideocamRoundedIcon />
                            Consult Now
                          </button>
                        )}

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div
                              className="modal-content"
                              style={{ minWidth: "600px" }}
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title p-3 font-weight-bold"
                                  id="exampleModalLabel"
                                >
                                  Schedule your Appointment
                                </h5>
                                <button
                                  type="button"
                                  className="close appn"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div
                                className="modal-body"
                                style={{ minHeight: "500px" }}
                              >
                                <div className="row">
                                  <div className="col-md-8">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DemoContainer
                                        components={[
                                          "DatePicker",
                                          "TimePicker",
                                        ]}
                                      >
                                        <StaticDatePicker
                                          defaultValue={state.value}
                                          minDate={dayjs()}
                                          maxDate={dayjs().add(1, "month")}
                                          onChange={handleDatesChange}
                                          shouldDisableDate={(date) =>
                                            state.highlightedDays.includes(
                                              date.format("YYYY-MM-DD")
                                            )
                                          }
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>
                                  </div>
                                  <div className="col-sm-12 col-md-4 p-5">
                                    {state.selectedDate && (
                                      <>
                                        <p>Select Time Slot</p>
                                        {state.timeSlots.map((time, index) => {
                                          const isUnbooked =
                                            state.unbookedSlots.includes(time);
                                          const isSelected =
                                            state.selectedTimeSlot === time;
                                          return (
                                            <div
                                              key={index}
                                              className="row pt-2"
                                            >
                                              <div className="col-md-6">
                                                <Button
                                                  variant={
                                                    isSelected
                                                      ? "primary"
                                                      : isUnbooked
                                                      ? "outline-primary"
                                                      : "outline-danger"
                                                  }
                                                  disabled={!isUnbooked}
                                                  className="w-100 d-block"
                                                  onClick={() =>
                                                    setState({
                                                      ...state,
                                                      selectedTimeSlot: time,
                                                    })
                                                  }
                                                >
                                                  {time}
                                                </Button>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>
                                </div>
                                {state.selectedDate && (
                                  <p
                                    className="ml-4 my-2"
                                    style={{ fontSize: "18px" }}
                                  >
                                    Date:{" "}
                                    {dayjs(state.selectedDate).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </p>
                                )}
                                {state.selectedTimeSlot && (
                                  <p
                                    className="ml-4 my-2"
                                    style={{ fontSize: "18px" }}
                                  >
                                    Time: {state.selectedTimeSlot}
                                  </p>
                                )}
                                {state.selectedTimeSlot && (
                                  <Button
                                    variant="dark"
                                    onClick={bookAppointment}
                                    className="p-2 m-4"
                                  >
                                    Book Appointment
                                  </Button>
                                )}
                                {state.bookingLoading && (
                                  <Alert variant="danger" className="h6 mx-3">
                                    Please wait while we book your Appointment!!
                                  </Alert>
                                )}
                                {state.alertBooking && (
                                  <Alert variant="success" className="h6 mx-3">
                                    Booked successfully!! Check your Email.
                                  </Alert>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <EditProfile
                    show={state.modalShow}
                    onHide={() => setState({ ...state, modalShow: false })}
                    items={state.items}
                    fetchDoctor={fetchDoctorData}
                    id={id.split("-")[0]}
                  />
                </div>
              </div>
              <div className="aboutDr">
                <div className="h4 font-weight-bold">
                  About {state.items.prefix} {state.items.firstName}{" "}
                  {state.items.middleName} {state.items.lastName}
                </div>

                <div id="about-contain">
                  <p className="text one">
                    {state.items.about.includes("•")
                      ? state.items.about.split("•").map((item, idx) => (
                          <li key={idx} className={`list-${idx}`}>
                            {item}
                          </li>
                        ))
                      : state.items.about}
                    {id.split("-")[0] === "872" && (
                      <>
                        <br />
                        More about him at{" "}
                        <a
                          href="https://ayurvedguru.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          www.ayurvedguru.com
                        </a>
                        .
                      </>
                    )}
                    {id.split("-")[0] === "878" && (
                      <>
                        <br />
                        More about him at{" "}
                        <a
                          href="http://www.ayushmanbhavayurveda.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          www.ayushmanbhavayurveda.com
                        </a>
                        .
                      </>
                    )}
                    {id.split("-")[0] === "884" && (
                      <>
                        <br />
                        More about him at{" "}
                        <a
                          href="http://expertayurveda.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          http://expertayurveda.com/
                        </a>
                        .
                      </>
                    )}
                  </p>
                  {state.items.websiteUrl && (
                    <a
                      href={state.items.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h6"
                    >
                      {state.items.websiteUrl}
                    </a>
                  )}
                </div>

                <br />

                <div className="abt-eduction">
                  <div className="h4 font-weight-bold">Education</div>
                  <p>{state.items.degDesc}</p>
                </div>

                <div className="mt-5">
                  <div className="h4 font-weight-bold">Accomplishments</div>
                  {state.items.awards.split("•").map((award, idx) => (
                    <li key={idx} className={`list-${idx}`}>
                      {award}
                    </li>
                  ))}
                </div>

                <br />

                <div className="about-specialties">
                  <div className="h4 font-weight-bold">Specialties</div>
                  <ul>
                    <li>{state.items.primarySpl}</li>
                  </ul>
                  <ul>
                    <li>{state.items.otherSpecializations}</li>
                  </ul>
                </div>

                <br />

                <div className="abt-eduction">
                  <div className="h4 font-weight-bold">Miscellaneous</div>
                  <div className="h6 font-weight-bold">
                    City:
                    <span> {state.items.city}</span>
                  </div>
                  <div className="h6 font-weight-bold">
                    State:
                    <span> {state.items.state}</span>
                  </div>
                  <div className="h6 font-weight-bold">
                    Country:
                    <span> {state.items.country}</span>
                  </div>
                  <div className="h6 font-weight-bold">
                    Gender:
                    {state.items.gender === 2 ? (
                      <span> Male </span>
                    ) : (
                      <span> Female</span>
                    )}
                  </div>
                </div>
              </div>
              {userAccess ? (
                <>
                  {state.rating.length === 0 ? (
                    <span className="h5 mt-3">
                      Your feedback is valuable to us, please rate here...
                    </span>
                  ) : (
                    <p className="h5 mt-3">
                      Your Earlier Rating: {state.rating}{" "}
                      <span className="icon-star-1"></span>
                      <br />
                      Rate Again
                    </p>
                  )}
                </>
              ) : (
                <div className="h5 mt-3">Rate here</div>
              )}
              <div id="">
                <Rating docid={id.split("-")[0]} ratingVal={state.rating} />
              </div>

              {userId && items.chatService === 1 && userAccess !== 1 && (
                <>
                  {items.imgLoc ? (
                    <Chat
                      imageURL={items.imgLoc}
                      items={items}
                      docid={state.docid}
                    />
                  ) : (
                    <Chat
                      dummy={<i className="fas fa-user-sm"></i>}
                      items={items}
                      docid={state.docid}
                    />
                  )}
                </>
              )}
              <div className="comment-box">
                {userId && (
                  <Comment
                    refreshComments={getComments}
                    docid={id.split("-")[0]}
                  />
                )}
              </div>

              {/* SHOW ALL COMMENTS */}
              <div className="main-hero">
                {!state.showMore
                  ? state.comment
                      .slice(0, 3)
                      .map((item, i) => showComments(item, i))
                  : state.comment.map((item, i) => showComments(item, i))}
              </div>

              {state.comment.length > 3 && (
                <button
                  id="show-hide-comments"
                  className="white-button-shadow btn w-100"
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      showMore: !prevState.showMore,
                    }))
                  }
                >
                  {!state.showMore ? "Show more" : "Hide"}
                </button>
              )}
            </div>
            <div className="col-md-4">
              <div
                className="profile-card doctors-article d-flex flex-column hideScroll"
                style={{ overflowY: " auto", maxHeight: "960px" }}
              >
                <div className="h5 font-weight-bold mb-3">
                  {/* No cures By Dr. {items.docname_first} {items.docname_middle} {items.docname_last} yet */}
                  <div className="text-center">Explore Cures</div>
                </div>
                {state?.articleItems
                  ? state?.articleItems.map((i, index) => (
                      <AllPost
                        id={i.article_id}
                        title={i.title}
                        f_title={i.friendly_name}
                        w_title={i.window_title}
                        type={i.type}
                        content={decodeURIComponent(
                          i.content
                            ? i.content.includes("%22%7D%7D%5D%7D")
                              ? i.content
                              : i.content.replace("%7D", "%22%7D%7D%5D%7D")
                            : null
                        )}
                        // type = {i.type}
                        published_date={i.published_date}
                        over_allrating={i.over_allrating}
                        // country = {i.country_id}
                        imgLocation={i.content_location}
                        // history = {props.history}
                      />
                    ))
                  : null}

                {state?.articleItems.length > 0 && (
                  <div className="d-grid mt-3 mb-5 text-center">
                    <button
                      onClick={allPosts}
                      type="button"
                      className="btn btn-danger"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="chat">
        <div className="container">
          <div className="row">
            <div className="">
              {" "}
              <a href="//#">
                {" "}
                <span className="icon-chatbot">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                  <span className="path6"></span>
                  <span className="path7"></span>
                  <span className="path8"></span>
                  <span className="path9"></span>
                  <span className="path10"></span>
                  <span className="path11"></span>
                  <span className="path12"></span>
                  <span className="path13"></span>
                  <span className="path14"></span>
                  <span className="path15"></span>
                  <span className="path16"></span>
                  <span className="path17"></span>
                  <span className="path18"></span>
                  <span className="path19"></span>
                </span>{" "}
              </a>{" "}
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
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
                          <img src={Doct} alt="doct" />
                        </div>
                        <div className="btn-Gropu">
                          <a href="/#" className="appBTN">
                            App Store
                          </a>
                          <a href="/#" className="appBTN">
                            App Store
                          </a>
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
      <Footer />
    </div>
  );
}

export default Profile;

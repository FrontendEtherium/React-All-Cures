import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Container, Button, Alert } from "react-bootstrap";

import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";
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
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};
function BookAppointment() {
  const today = dayjs();
  const [highlightedDays] = useState()
  return (
    <div class="modal-dialog" role="document">
      <div class="modal-content" style={{ minWidth: "600px" }}>
        <div class="modal-header">
          <h5 class="modal-title p-3 font-weight-bold " id="exampleModalLabel">
            Schedule your Appointment
          </h5>
          <button
            type="button"
            class="close appn"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" style={{ minHeight: "500px" }}>
          <div className="row">
            <div className=" col-md-8">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "TimePicker"]}>
                  <StaticDatePicker
                    defaultValue={today}
                    minDate={today}
                    maxDate={today.add(1, "month")}
                    slots={{
                      day: ServerDay,
                    }}
                    onAccept={() => {
                      alert("Accepted");
                    }}
                    slotProps={{
                      day: {
                        highlightedDays,
                      },
                    }}
                    onChange={this.handleDatesChange} // Add onChange to update selectedDate
                    showToolbar={false}
                    disableCloseOnSelect={false}
                    shouldDisableDate={this.disableDate}
                    // renderDay={this.renderDay}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-sm-12 col-md-4 p-5">
              {this.state.selectedDate && (
                <>
                  <p> Select Time Slot</p>
                  <div
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {this.state.timeSlots &&
                      this.state.timeSlots.map((time, index) => {
                        const [hours, minutes] = time.split(":").map(Number);
                        const suffix = hours >= 12 ? "PM" : "AM";
                        const adjustedHours = hours % 12 || 12; // Convert 0 hours to 12 for 12 AM
                        const formattedTime = `${adjustedHours}:${
                          minutes < 10 ? "0" : ""
                        }${minutes} ${suffix}`;

                        console.log("Formatted Time:", formattedTime);

                        const isUnbooked =
                          this.state.unbookedSlots.includes(time);
                        const isSelected = this.state.selectedTimeSlot === time;

                        // Get the current date and time
                        const currentDate = new Date();
                        const currentDateString = currentDate.toDateString();
                        const currentTime =
                          currentDate.getHours() * 60 +
                          currentDate.getMinutes(); // Current time in minutes

                        // Get the selected date
                        const selectedDate = new Date(this.state.selectedDate);
                        const selectedDateString = selectedDate.toDateString();

                        // Check if the selected date is today
                        const isToday =
                          currentDateString === selectedDateString;

                        // Calculate the time slot in minutes
                        const timeSlotTime =
                          parseInt(hours) * 60 + parseInt(minutes);

                        // Check if the time slot is for today and in the past
                        const isPast = isToday && timeSlotTime < currentTime;

                        return (
                          <div className="row pt-2">
                            <div className=" col-md-6 ">
                              <div
                                style={{
                                  minWidth: "120px",
                                }}
                              >
                                <Button
                                  variant={
                                    isSelected
                                      ? "primary"
                                      : isUnbooked
                                      ? "outline-primary"
                                      : "outline-danger"
                                  }
                                  disabled={!isUnbooked || isPast}
                                  className="w-80 d-block"
                                  onClick={() => this.handleTimeSlot(time)}
                                >
                                  {formattedTime}
                                </Button>
                                {/* onClick={()=>this.handleTimeSlot(time)} */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* <div>
        {this.state.selectedDate && (
          <p
            className="ml-4 my-2"
            style={{ fontSize: "18px" }}
          >
            Dates:{" "}
            {dayjs(
              this.state.selectedDate
            ).format("YYYY-MM-DD")}
          </p>
        )}

        {this.state.selectedTimeSlot && (
          <p
            className="ml-4 my-2"
            style={{ fontSize: "18px" }}
          >
            Time:{this.state.selectedTimeSlot}
        
          </p>
        )}
      </div> */}

          {this.state.selectedTimeSlot && (
            <Button
              variant="dark"
              onClick={this.bookAppn}
              className="p-2 m-4"
              style={{ background: "#00415e" }}
            >
              Book Appointment
            </Button>
          )}
          {/* <Button
variant="dark"
onClick={this.payment}
className="p-2 m-4"
>
Pay Now
</Button> */}

          {this.state.bookingLoading ? (
            <Alert variant="danger" className="h6 mx-3">
              Please wait while we book your Appointment!!
            </Alert>
          ) : null}

          {this.state.alertBooking ? (
            <Alert variant="success" className="h6 mx-3">
              Booked successfully!! Check your Email.
            </Alert>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;

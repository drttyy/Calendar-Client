import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

function Myapp({ filterAppointments, appointments }) {
  const [date, setDate] = useState(new Date());

  const handleChange = (e) => {
    console.log(new Date(e).toDateString());
    setDate(e);
    filterAppointments(new Date(e).toDateString());
  };

  const StyledCalendar = styled.div`
    .highlight {
      background-color: red;
      border-radius: 100%;
    }
  `;

  return (
    <StyledCalendar>
      <Calendar
        onChange={handleChange}
        value={date}
        tileClassName={({ date, view }) => {
          if (
            appointments.find(
              (appointment) =>
                new Date(appointment.date).toDateString() ===
                new Date(date).toDateString()
            )
          ) {
            return "highlight";
          }
        }}
      />
    </StyledCalendar>
  );
}
export default Myapp;

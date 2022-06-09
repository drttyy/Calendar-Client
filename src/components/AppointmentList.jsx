import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledList = styled.div`
  color: white;
  border: 1px solid white;
  margin-bottom: 2em;
`;

function AppointmentList({ appointments }) {
  return (
    <div>
      <h1>Appointments</h1>
      {appointments.map((appointment) => {
        return (
          <StyledList>
            <p>{appointment.title}</p>
            <p>{appointment.description}</p>
            <p>{new Date(appointment.date).toLocaleDateString()}</p>
            <p>{new Date(appointment.date).toLocaleTimeString()}</p>
          </StyledList>
        );
      })}
    </div>
  );
}

export default AppointmentList;

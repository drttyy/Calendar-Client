import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledList = styled.div`
  color: white;
  border: 2px solid white;
  margin-bottom: 2em;
  background-color: #64732f;
  border-radius: 15px;
  width: 15em;
`;

function AppointmentList({ appointments }) {
  return (
    <div>
      {appointments.map((appointment) => {
        return (
          <StyledList key={appointment._id}>
            <h2>{appointment.title}</h2>
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

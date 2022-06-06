import React from "react";
import styled from "styled-components";
import Calendar from "../components/Calendar";
import Appbar from "../components/Appbar";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #010d77;
  height: 100vh;
  align-items: center;

  h1 {
    color: white;
  }
  .Calendar {
    border: 2px solid white;
  }
`;
function CalendarPage() {
  return (
    <StyledPage>
      <h1>Your Calendar</h1>
      <Calendar className={Calendar} />
      <Appbar />
    </StyledPage>
  );
}

export default CalendarPage;

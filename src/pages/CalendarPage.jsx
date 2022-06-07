import React from "react";
import styled from "styled-components";
import Calendar from "../components/Calendar";
import Appbar from "../components/Appbar";
import Searchform from "../components/Searchform";
import { Link } from "react-router-dom";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #010d77;
  height: 100vh;
  align-items: center;

  h1 {
    color: white;
  }
`;
function CalendarPage() {
  return (
    <StyledPage>
      <h1>Your Calendar</h1>
      <Link to={"/appointment-create"}>
        {" "}
        <img src="./plus.jgp" alt="plus icon" />
      </Link>
      <Searchform />
      <Calendar />
      <Appbar />
    </StyledPage>
  );
}

export default CalendarPage;

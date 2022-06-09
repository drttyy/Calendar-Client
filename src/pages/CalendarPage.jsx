import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "../components/Calendar";
import Appbar from "../components/Appbar";
import Searchform from "../components/Searchform";
import { Link } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import axios from "axios";
import MyCompanies from "../components/MyCompanies";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #010d77;
  height: 100%;
  align-items: center;
  padding-bottom: 20em;

  h1 {
    color: white;
  }
  h4 {
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .plus-icon {
    border: 2px solid white;
    border-radius: 50px;
    height: 2em;
  }
`;

const AppointmentButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    margin-right: 10px;
  }
`;

function CalendarPage() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const toggleShowCompanies = () => {
    setShowCompanies(!showCompanies);
  };

  const getAppointments = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/appointment/user`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setAppointments(response.data);
      filterAppointments(new Date().toDateString());
    } catch (err) {
      console.log(err);
    }
  };

  const filterAppointments = (date) => {
    let result = [...appointments].filter((appointment) => {
      console.log(new Date(appointment.date).toDateString());
      return new Date(appointment.date).toDateString() === date;
    });
    setFilteredAppointments(result);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <StyledPage>
      <h1>Your Calendar</h1>

      <button onClick={toggleShowCompanies}>Companies Calendar</button>

      {showCompanies ? <MyCompanies /> : ""}

      <Calendar
        appointments={appointments}
        filterAppointments={filterAppointments}
      />
      <AppointmentButton>
        <h4>Add an appointment</h4>
        <Link to={"/appointment-create"}>
          <img className="plus-icon" src="/plus.jpg" alt="plus icon" />
        </Link>
      </AppointmentButton>
      <AppointmentList appointments={filteredAppointments} />
      <Appbar />
    </StyledPage>
  );
}

export default CalendarPage;

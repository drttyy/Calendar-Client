import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import Calendar from "../components/Calendar";

const StyledPage = styled.div`
  background-color: #010d77;
  padding-bottom: 2em;
  height: 100%;
  margin: 0;
  color: white;
  align-items: center;
  align-content: center;
  h1 {
    margin: 0;
    padding-top: 1.5em;
  }
  .arrowBtn {
    height: 3em;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 18em;
  }
`;
const AppointmentButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    margin-right: 10px;
  }
  img {
    height: 2em;
  }
`;

function CompanyDetailsPage() {
  const [company, setCompany] = useState(null);
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getCompany = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/company/${id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setCompany(response.data);
      setAppointments(response.data.appointments);
      filterAppointments(new Date().toDateString());
    } catch (error) {
      console.log(error);
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
    getCompany();
  }, []);
  return (
    <StyledPage>
      <Link to="/calendar">
        <img className="arrowBtn" src="/arrow-left.png" alt="left arrow" />
      </Link>
      {company && appointments && (
        <div>
          <h1>{company.name}</h1>
          <img src={company.image} alt="company image" />
          <p>
            <b>Opening hour:</b> {company.openingDate} | <b>Closing Hour:</b>
            {company.closinDate}
          </p>
          <p>{company.type}</p>

          <Calendar
            appointments={appointments}
            filterAppointments={filterAppointments}
          />
          <AppointmentButton>
            <h4>Add an appointment</h4>
            <Link to={`/company/${company._id}/appointment-create`}>
              <img className="plus-icon" src="/plus.jpg" alt="plus icon" />
            </Link>
          </AppointmentButton>
          <AppointmentList appointments={appointments} />
        </div>
      )}
    </StyledPage>
  );
}

export default CompanyDetailsPage;

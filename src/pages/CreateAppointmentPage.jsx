import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Appbar from "../components/Appbar";

const StyledPage = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  background-color: #34401a;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-top: 3em;
  color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  height: 20em;
  width: 15em;
  border: 2px solid white;
  border-radius: 15px;
  margin-top: 4em;
  font-size: 20px;
  div {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
  }
  .title-box {
    font-size: 15px;
    width: 15em;
    height: 3em;
  }

  .description-box {
    font-size: 15px;
    width: 15em;
    height: 3em;
  }

  .date-box {
    font-size: 15px;
    width: 15em;
    height: 3em;
  }

  button {
    margin-top: 1em;
    height: 2.5em;
    width: 12em;
    font-size: 17px;
    border-radius: 15px;
    background-color: #b4bf5e;
    color: white;
  }
`;

function CreateAppointmentPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const { id } = props;

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const body = { title, description, date, id };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/appointment`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        navigate("/calendar");
      })
      .catch((err) => err);
  };

  return (
    <StyledPage>
      <h1>Create an Appointment</h1>
      <div>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              className="title-box"
              type="text"
              placeholder="Cutting my hair"
              value={title}
              name="title"
              onChange={handleTitle}
            />
          </div>

          <div>
            <label htmlFor="description">Description: </label>
            <input
              className="description-box"
              type="text"
              placeholder="Cutting my hair to go lunch with my former colleagues"
              value={description}
              name="description"
              onChange={handleDescription}
            />
          </div>
          <div>
            <label htmlFor="date">Date </label>
            <input
              className="date-box"
              type="date"
              value={date}
              name="date"
              onChange={handleDate}
            />
          </div>
          <button type="submit">Create your appointment</button>
        </StyledForm>
      </div>

      <Appbar />
    </StyledPage>
  );
}

export default CreateAppointmentPage;

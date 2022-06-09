import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Appbar from "../components/Appbar";

const Page = styled.div`
  background-color: #010d77;
  height: 100vh;
  margin: 0;
  color: white;
  align-items: center;
  align-content: center;
  h1 {
    margin: 0;
    padding-top: 1.5em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  height: 15em;
  width: 15em;
  border: 1px solid white;
  border-radius: 15px;
  margin-top: 4em;
  font-size: 20px;
`;

function CreateCompanyPage(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { id } = props;

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleOpeningDate = (e) => {
    setOpeningDate(e.target.value);
  };

  const handleClosingDate = (e) => {
    setClosingDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const body = [name, type, address, openingDate, closingDate, image];

    axios
      .post(`${process.env.REACT_APP_API_URL}/company`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => navigate("/calendar"))
      .catch((err) => setErrorMessage(err.response.data.errorMessage));
  };

  return (
    <Page>
      <h1>Create an Company</h1>

      <Form>
        <div onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              className="title-box"
              type="text"
              placeholder="BarberShop"
              value={name}
              name="title"
              onChange={handleName}
            />
          </div>

          <div>
            <label htmlFor="address">Address </label>
            <input
              className="address-box"
              type="text"
              placeholder="Cutting my hair to go lunch with my former colleagues"
              value={address}
              name="address"
              onChange={handleAddress}
            />
          </div>

          <div>
            <label htmlFor="date">Opening day </label>
            <input
              className="date-box"
              type="datetime-local"
              value={openingDate}
              name="date"
              onChange={handleOpeningDate}
            />
          </div>

          <div>
            <label htmlFor="date">Closing day </label>
            <input
              className="date-box"
              type="datetime-local"
              value={closingDate}
              name="date"
              onChange={handleClosingDate}
            />
          </div>

          <div>
            <label htmlFor="date">type </label>
            <input
              className="date-box"
              type="text"
              value={type}
              name="date"
              onChange={handleType}
            />
          </div>

          <div>
            <label htmlFor="date">Image </label>
            <input
              className="date-box"
              type="file"
              value={image}
              name="date"
              onChange={handleImage}
            />
          </div>
          <button type="submit">Create your company</button>
        </div>
      </Form>

      <Appbar />
    </Page>
  );
}

export default CreateCompanyPage;

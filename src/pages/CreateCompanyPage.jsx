import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Appbar from "../components/Appbar";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: #34401a;
  height: 100vh;
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
  justify-content: flex-start;
  color: white;
  height: 22em;
  width: 15em;
  border: 1px solid white;
  border-radius: 15px;
  margin-top: 4em;
  font-size: 20px;

  div {
    margin-top: 1em;

    button {
      margin-top: 2em;
      height: 2.5em;
      background-color: #b4bf5e;
      border-radius: 15px;
      font-size: 15px;
      color: white;
    }
    .image {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

function CreateCompanyPage(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem("authToken");

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

  const handleOpeningDate = (e) => {
    setOpeningDate(e.target.value);
  };

  const handleClosingDate = (e) => {
    setClosingDate(e.target.value);
  };

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    setIsLoading(true);
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setImage(response.data.fileUrl);
        setIsLoading(false);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const body = { name, type, address, openingDate, closingDate, image };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-company`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Page>
      <h1>Create an Company</h1>
      <Form onSubmit={handleSubmit}>
        <div>
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
            <label htmlFor="image">Image </label>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
          </div>
          <button type="submit">Create your company</button>
        </div>
      </Form>

      <Appbar />
    </Page>
  );
}

export default CreateCompanyPage;

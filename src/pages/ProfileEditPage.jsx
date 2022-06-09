import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";

const StyledPage = styled.div`
  display: flex;
  background-color: #010d77;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  color: white;

  label {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
  }

  input {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
  }

  .arrowBtn {
    height: 3em;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 18em;
    margin-bottom: 6em;
  }

  .editBtn {
    margin-top: 2em;
  }
`;

const StyledForms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;

  border: 1px solid white;
  border-radius: 15px;
  img {
    height: 5em;
  }
`;

function ProfileEditPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState();
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const { user, authenticateUser } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");
  const getProfile = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setPhonenumber(response.data.phonenumber);
      setImage(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user/${user._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhonenumber = (e) => setPhonenumber(e.target.value);
  const handleImage = (e) => setImage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { firstName, lastName, email, phonenumber, image };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/${user._id}`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        setFirstName();
        setLastName("");
        setEmail("");
        setPhonenumber(null);
        setImage("");
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledPage>
      <h1>Edit your profile</h1>
      <Link to="/profile">
        <img className="arrowBtn" src="/arrowleft.png" alt="" />
      </Link>

      <StyledForms onSubmit={handleSubmit}>
        <img src={image} alt="Profile picture" />
        <input type="file" name="image" />

        <label htmlFor="firstName">FirstName</label>
        <input
          type="text"
          placeholder="Jonh"
          value={firstName}
          name="firstName"
          onChange={handleFirstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Cena"
          value={lastName}
          name="lastName"
          onChange={handleLastName}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          name="email"
          onChange={handleEmail}
        />

        <label htmlFor="phonenumber">Phonenumber</label>
        <input
          type="number"
          placeholder="910000000"
          value={phonenumber}
          name="phonenumber"
          onChange={handlePhonenumber}
        />

        <button type="submit">Edit</button>
      </StyledForms>

      <button className="deleteBtn" onClick={deleteProfile}>
        Delete your profile
      </button>
    </StyledPage>
  );
}

export default ProfileEditPage;

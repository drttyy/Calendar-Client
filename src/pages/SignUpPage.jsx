import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #010d77;
  height: 100vh;
  margin: 0;
  h1 {
    font-size: 3em;
    color: white;
  }
  form {
    display: flex;
    padding: 2em;
    width: 20em;
    margin-top: 1em;
    border: 1px solid white;
    flex-flow: column wrap;
    font-size: 1em;
    color: white;
  }
  label {
    display: flex;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
  }
  input {
    font-size: 1.5em;
    border-radius: 10px;
  }
  button {
    margin-top: 2em;
    height: 3em;
    border-radius: 25px;
  }
  .loginBtn {
    font-size: 1.5em;
    text-decoration: none;
    color: white;
    margin-top: 1.5em;
    width: 14em;
  }
  .arrowBtn {
    height: 3em;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 18em;
    margin-top: 1.5em;
  }
`;

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { firstName, lastName, password, email, phonenumber };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, body)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => setErrorMessage(err.response.data.errorMessage));
  };
  return (
    <Page>
      <a href="/">
        <img className="arrowBtn" src="/arrowleft.png" alt="left arrow" />
      </a>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePassword}
        />

        <label htmlFor="phonenumber">Phonenumber</label>
        <input
          type="number"
          placeholder="910000000"
          value={phonenumber}
          name="phonenumber"
          onChange={handlePhonenumber}
        />

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link className="loginBtn" to="/login">
        You already have an account? Go to the login page
      </Link>
    </Page>
  );
}

export default SignUpPage;

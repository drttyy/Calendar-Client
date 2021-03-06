import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #34401a;
  height: 100vh;
  h1 {
    font-size: 3em;
    color: white;
  }
  form {
    display: flex;
    padding: 2em;
    width: 18em;
    margin-top: 5em;
    border-radius: 15px;
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
    background-color: #b4bf5e;
    border: 3px solid white;
  }
  .signBtn {
    font-size: 1.5em;
    text-decoration: none;
    color: white;
    margin-top: 2.5em;
    width: 13em;
  }
  .arrowBtn {
    height: 3em;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 18em;
    margin-top: 1em;
  }
  .error-message {
    color: red;
    font-size: 1.5em;
  }
`;

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { password, email };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        console.log(response.data);
        authenticateUser();
        storeToken(response.data.authToken);
        navigate("/calendar");
      })
      .catch((err) => setErrorMessage(err.response.data.errorMessage));
  };
  return (
    <Page>
      <a href="/">
        <img className="arrowBtn" src="/arrow-left.png" alt="" />
      </a>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">LogIn</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link className="signBtn" to="/signup">
        You don't have an account? Create you account now!
      </Link>
    </Page>
  );
}

export default LogInPage;

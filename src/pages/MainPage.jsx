import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMainPage = styled.div`
  display: flex;
  margin: 0;
  background-color: #010d77;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    color: white;
  }
  img {
    display: flex;
    height: 18em;
    width: 18em;
    display: flex;
  }
  p {
    width: 15em;
    color: white;
    font-size: 1.5em;
  }
`;

const SignUpBtn = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  a {
    display: flex;
    height: 3em;
    width: 15em;
    border: 2px solid white;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-radius: 25px 25px 25px 25px;
    color: white;
  }
`;

const LogInBtn = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  a {
    display: flex;
    justify-content: center;
    text-decoration: none;
    height: 3em;
    width: 15em;
    border: 2px solid white;
    align-items: center;
    border-radius: 25px 25px 25px 25px;
    color: white;
  }
`;

function MainPage() {
  return (
    <StyledMainPage>
      <h1>ON POINT</h1>

      <img src="/calendar.jpg" alt="" />
      <p>Get started so you never forget an appointment again</p>
      <SignUpBtn>
        <Link to="/signup">SIGN UP</Link>
      </SignUpBtn>

      <LogInBtn>
        <Link to="/login">LOG IN</Link>
      </LogInBtn>
    </StyledMainPage>
  );
}

export default MainPage;

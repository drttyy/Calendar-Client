import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AppbarStyle = styled.nav`
  margin: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #252617;
  width: 100%;
  height: 10vh;
  flex-direction: row;
  width: 100%;
  height: 15vh;
  border-radius: 70px 70px 0px 0px;
  position: fixed;
  padding-right: 1px;
  bottom: 0;
  border-top: 3px solid #b4bf5e;
  a {
    color: white;
    text-decoration: none;
    font-size: 20px;
  }
`;

function Appbar() {
  return (
    <AppbarStyle>
      <Link to="/calendar">Calendar</Link>
      <Link to="/company">Company</Link>
      <Link to="/profile">Profile</Link>
    </AppbarStyle>
  );
}

export default Appbar;

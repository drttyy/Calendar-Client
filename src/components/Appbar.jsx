import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AppbarStyle = styled.nav`
  margin: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #010d77;
  width: 100%;
  height: 10vh;
  flex-direction: row;
  width: 100%;
  height: 15vh;
  border-radius: 70px 70px 0px 0px;
  position: fixed;
  padding-right: 1px;
  bottom: 0;
  border-top: 2px solid white;
  a {
    color: white;
    text-decoration: none;
  }
`;

function Appbar() {
  return (
    <AppbarStyle>
      <a href="/calendar">Calendar</a>
      <a href="/favorites">Favorites</a>
      <a href="/profile">Profile</a>
    </AppbarStyle>
  );
}

export default Appbar;
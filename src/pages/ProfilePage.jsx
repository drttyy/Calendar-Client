import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import MyCompanies from "../components/MyCompanies";

const StyledPage = styled.div`
  display: flex;
  background-color: #34401a;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  img {
    height: 8.5em;
    border-radius: 10em;
  }
  h1 {
    margin: 0;
    color: white;
  }
  Link {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  .button {
    text-decoration: none;
    background-color: #64732f;
    color: white;
    border: 2px solid white;
    width: 7em;
    border-radius: 20px;
    font-size: 20px;
    height: 3em;
  }
  .arrowBtn {
    height: 3em;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 18em;
  }
  .picture {
    border: 4px solid white;
  }

  .profile {
    border: 2px solid white;
    color: white;
    padding: 4em;
    border-radius: 10px;
  }
  .logout {
    display: flex;
    border: 1px solid white;
    color: black;
    text-decoration: none;
    width: 5em;
    height: 2em;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 15px;
  }
`;

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const { user, authenticateUser, logoutUser } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authenticateUser();
    getProfile(user);
  }, []);

  return (
    <StyledPage>
      <h1>Profile</h1>
      <Link to="/calendar">
        <img className="arrowBtn" src="/arrow-left.png" alt="left arrow" />
      </Link>
      {profile && (
        <div className="profile">
          <img className="picture" src={profile.image} alt="profile picture" />
          <p>
            <b>Name: </b>
            {profile.firstName} {profile.lastName}
          </p>
          <p>
            <b>Email: </b>
            {profile.email}
          </p>
          <p>Phonenumber: {profile.phonenumber}</p>
        </div>
      )}
      {profile && (
        <>
          <Link className="button" to={`/profile/edit/${user._id}`}>
            Edit your profile
          </Link>
        </>
      )}

      <Link className="logout" onClick={logoutUser} to="/">
        Logout
      </Link>
    </StyledPage>
  );
}

export default ProfilePage;

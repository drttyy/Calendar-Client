import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const StyledPage = styled.div`
  display: flex;
  background-color: #010d77;
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
    color: white;
    border: 1px solid white;
    width: 7em;
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
    border: 1px solid black;
  }

  .profile {
    border: 2px solid white;
    color: white;
    padding: 4em;
    border-radius: 10px;
  }
`;

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const { user, authenticateUser } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authenticateUser();
    getProfile();
  }, []);

  return (
    <StyledPage>
      <Link to="/calendar">
        <img className="arrowBtn" src="/arrowleft.png" alt="left arrow" />
      </Link>
      <h1>Profile</h1>
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
          <p>{profile.phonenumber}</p>
        </div>
      )}
      {profile && (
        <>
          <Link className="button" to={`/profile/edit/${user._id}`}>
            Edit your profile
          </Link>
        </>
      )}

      <Link className="button" to="/themes">
        Change theme
      </Link>

      <Link className="button" to="/logout">
        Logout
      </Link>
    </StyledPage>
  );
}

export default ProfilePage;

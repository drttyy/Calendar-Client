import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import axios from "axios";

const StyledPage = styled.div`
  display: flex;
  background-color: #010d77;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  img {
    height: 17em;
    border-radius: 10em;
  }
  h1 {
    margin: 0;
    color: white;
  }
  a {
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
`;

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const { profileId } = useParams();

  const getProfile = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5005/api/profile/${profileId}`
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }

    useEffect(() => {
      getProfile();
    }, []);
  };

  return (
    <StyledPage>
      <h1>Profile</h1>
      {profile && (
        <>
          <img src={profile.picture} alt="profile picture" />
          <h3>{profile.firstName}</h3>
          <h3>{profile.lastName}</h3>
          <h3>{profile.email}</h3>
          <h3>{profile.phonenumber}</h3>
        </>
      )}
      {profile && (
        <>
          <Link to={`/profile/edit/${profile._id}`}>
            <a className="button" href="edit/profile">
              Edit your profile
            </a>
          </Link>
        </>
      )}

      <a className="button" href="/themes">
        Change theme
      </a>

      <a className="button" href="/logout">
        Logout
      </a>
    </StyledPage>
  );
}

export default ProfilePage;

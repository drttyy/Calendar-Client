import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";

const StyledPage = styled.div`
  display: flex;
  background-color: #34401a;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-bottom: 2em;

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
    margin-bottom: 3em;
    margin-top: 1em;
  }

  .editBtn {
    margin-top: 2em;
  }

  .deleteBtn {
    background-color: red;
    height: 3em;
    margin-top: 2em;
    color: white;
    font-size: 15px;
    border-radius: 10px;
  }
`;

const StyledForms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  height: 30em;
  width: 22em;
  border: 2px solid white;
  border-radius: 15px;
  margin: 1em;
  img {
    height: 7em;
    border-radius: 100%;
  }

  input {
    height: 2em;
  }

  div {
    display: flex;
    flex-direction: column;
    margin: 0.5em;
  }

  .edit {
    height: 3em;
    width: 5em;
    border-radius: 15px;
    font-size: 15px;
    background-color: #b4bf5e;
  }
`;

function ProfileEditPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, authenticateUser } = useContext(AuthContext);
  const { id } = useParams();

  const storedToken = localStorage.getItem("authToken");
  const getProfile = async () => {
    console.log(id);
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${user}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response.data);
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
        `${process.env.REACT_APP_API_URL}/api/user/${id}/delete`,
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
        <img className="arrowBtn" src="/arrow-left.png" alt="left arrow" />
      </Link>
      <StyledForms onSubmit={handleSubmit}>
        <img src={image} alt="Profile picture" />
        <div>
          <iput type="file" name="image" />
        </div>
        <div>
          <label htmlFor="firstName">FirstName </label>
          <input
            type="text"
            placeholder="Jonh"
            value={firstName}
            name="firstName"
            onChange={handleFirstName}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Cena"
            value={lastName}
            name="lastName"
            onChange={handleLastName}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            name="email"
            onChange={handleEmail}
          />
        </div>

        <div>
          <label htmlFor="phonenumber">Phonenumber</label>
          <input
            type="number"
            placeholder="910000000"
            value={phonenumber}
            name="phonenumber"
            onChange={handlePhonenumber}
          />
        </div>
        <button className="edit" type="submit">
          Edit
        </button>
      </StyledForms>

      <button className="deleteBtn" onClick={deleteProfile}>
        Delete your profile
      </button>
    </StyledPage>
  );
}

export default ProfileEditPage;

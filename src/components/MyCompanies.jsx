import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const StyledList = styled.div`
  display: flex;
  margin-bottom: 1em;
  border: 2px solid white;
  border-radius: 20px;
  width: 10em;
  height: 2.5em;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #64732f;
  a {
    color: white;
    text-decoration: none;
  }
`;
function MyCompanies() {
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
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
      setCompanies(response.data.createdCompany);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <StyledList>
        {companies &&
          companies.map((company) => {
            return (
              <Link key={company._id} to={`/company/${company._id}`}>
                <div>{company.name}</div>
              </Link>
            );
          })}
      </StyledList>
    </>
  );
}

export default MyCompanies;

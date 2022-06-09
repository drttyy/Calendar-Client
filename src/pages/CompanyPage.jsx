import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "../components/Searchform";

const StyledPage = styled.div`
  display: flex;
  background-color: #010d77;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  color: white;
  .createBtn {
    display: flex;
    height: 2em;
    text-decoration: none;
    color: white;
    border: 1px solid white;
    text-align: center;
    align-items: center;
    padding: 1em;
  }
`;

const StyledList = styled.div`
  display: flex;
  margin-top: 3em;
  border: 2px solid white;
  width: 80%;
  height: 5em;
  align-items: center;
  img {
    height: 5em;
  }
  .title {
    font-size: 2em;
  }
`;

function CompanyPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/company}`).then((response) => {
      setCompanies(response.data);
    });
  }, []);

  return (
    <StyledPage>
      <h1>Companies</h1>
      <SearchForm />

      <StyledList>
        <img src="/default-profile.jpg" alt="" />
        <div>
          <p className="title">
            <b> title </b>
          </p>
          <div>
            <p className="type">type</p>
            <p className="date">date</p>
          </div>
        </div>
      </StyledList>

      {companies.map((comp) => {
        return (
          <div key={comp._id} onClick={"/company/:companyId"}>
            <img src={comp.image} alt="" />
            <p className="name">{comp.name}</p>
            <p className="type">{comp.type}</p>
            <p className="date">{comp.date}</p>
          </div>
        );
      })}
      <Appbar />
    </StyledPage>
  );
}

export default CompanyPage;

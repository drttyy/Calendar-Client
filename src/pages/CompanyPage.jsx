import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "../components/Searchform";

const StyledPage = styled.div`
  display: flex;
  background-color: #34401a;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  color: white;
  .button {
    display: flex;
    height: 1em;
    font-size: 20px;
    border-radius: 25px;
    background-color: #b4bf5e;
    text-decoration: none;
    color: white;
    border: 1px solid white;
    text-align: center;
    align-items: center;
    padding: 1em;
  }

  a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: white;
  }
  p {
    margin-right: 10px;
  }
`;

const StyledList = styled.div`
  display: flex;
  margin-top: 3em;
  border: 2px solid white;
  background-color: #64732f;
  height: 5em;
  width: 22em;
  border-radius: 15px;
  text-decoration: none;
  align-items: center;
  img {
    height: 5em;
    width: 5em;
    margin-right: 1em;
  }
  .name {
    font-size: 20px;
    text-decoration: none;
    margin-right: 10px;
  }
`;

function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const searchFilter = (search) => {
    console.log(search);
    let filteredCompanies = allCompanies.filter((company) => {
      return company.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filteredCompanies);
    setCompanies(filteredCompanies);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/company`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setCompanies(response.data);
        setAllCompanies(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledPage>
      <h1>Companies</h1>

      <Link className="button" to="/create-company">
        Create your company
      </Link>
      <SearchForm searchFilter={searchFilter} />
      {companies.map((comp) => {
        return (
          <Link key={comp._id} to={`/company/${comp._id}`}>
            <StyledList>
              <img src={comp.image} alt="" />
              <p className="name">{comp.name}</p>
              <p className="type">{comp.type}</p>
            </StyledList>
          </Link>
        );
      })}
      <Appbar />
    </StyledPage>
  );
}

export default CompanyPage;

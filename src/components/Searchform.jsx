import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchForm = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  align-items: center;
  label {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  input {
    height: 1.5em;
    border-radius: 10px;
  }
  .btn {
    margin-top: 0.5em;
    border: 1px solid white;
    background-color: white;
    width: 4em;
    border-radius: 100%;
    text-decoration: none;
    color: black;
  }
`;

function Searchform(props) {
  const { searchFilter } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };
  return (
    <SearchForm>
      <label htmlFor="search">Find a service</label>
      <input type="text" name="search" value={search} onChange={handleSearch} />
      <Link className="btn" to="/company">
        <b> Search</b>
      </Link>
    </SearchForm>
  );
}

export default Searchform;

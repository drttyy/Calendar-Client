import React, { useState } from "react";
import styled from "styled-components";

const SearchForm = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;

  label {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  input {
    height: 1.5em;
    border-radius: 10px;
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
    </SearchForm>
  );
}

export default Searchform;

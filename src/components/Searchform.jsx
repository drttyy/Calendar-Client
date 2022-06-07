import React, { useState } from "react";

function Searchform(props) {
  const { searchFilter } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search Movies</label>
      <input type="text" name="search" value={search} onChange={handleSearch} />
    </div>
  );
}

export default Searchform;

import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Search = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/id/${searchedValue}`)
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="search-input" className="search-label">
          Search for student by student ID
        </label>
        <input
          id="search-input"
          className="search-input"
          type="text"
          value={searchedValue}
          onChange={(e) => {
            setSearchedValue(e.target.value);
          }}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default Search;

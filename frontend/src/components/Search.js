import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from "../config";

const Search = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [schoolList, setSchoolList] = useState([])
  const navigate = useNavigate();
  const baseServerURL = config.baseServerURL

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/id/${searchedValue}`);
  };

  const getSchools = async()=>{
    const schools = await axios.get(`${baseServerURL}/students/schools`)
    schools.data.sort()
    setSchoolList(schools.data)
  }

  const handleClick=(schoolName)=>{
    console.log(schoolName)
    navigate(`/school/${schoolName}`)
  }

  useEffect(()=>{
    getSchools()
  },[])

  const createSchoolsList = ()=>{
    let schoolsListComponent =[]
    for(let i=0; i<schoolList.length; i++){
      schoolsListComponent.push(
        <li className="school-name" key={schoolList[i]} onClick={()=>handleClick(schoolList[i])} value={schoolList[i]}>{schoolList[i]}</li>
      )
    }
    return schoolsListComponent
  }

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
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="school-list">
        <h1>Or look at our schools</h1>
        <ul className="school-list">
          {createSchoolsList()}
        </ul>
      </div>
    </div>
  );
};

export default Search;

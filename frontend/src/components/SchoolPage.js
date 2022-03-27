import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import config from "../config";

const SchoolPage = () => {
  const { schoolName } = useParams();
  const navigate = useNavigate();
  const [homeroomList, setHomeroomList] = useState([]);

  const baseServerURL = config.baseServerURL;

  const getHomeroomList = async () => {
    const data = await axios(`${baseServerURL}/students/homerooms`, {
      params: {
        school: schoolName,
      },
    });
    const sortedData = data.data.sort();
    setHomeroomList(sortedData);
  };

  useEffect(() => {
    getHomeroomList();
  }, []);

  const handleClick = (homeroom) => {
    navigate(`/school/${schoolName}/homeroom/${homeroom}`);
  };

  const createHomeroomList = () => {
    let homeroomListComponent = [];
    for (let i = 0; i < homeroomList.length; i++) {
      homeroomListComponent.push(
        <li
          className="homeroom-li"
          key={homeroomList[i]}
          onClick={() => {
            handleClick(homeroomList[i]);
          }}
        >
          {homeroomList[i]}
        </li>
      );
    }
    return homeroomListComponent;
  };

  return (
    <div className="school-page">
      <h1>Homerooms in building/school {schoolName}</h1>
      {createHomeroomList()}
    </div>
  );
};

export default SchoolPage;

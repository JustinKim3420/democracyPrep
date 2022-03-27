import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import config from "../config";

const HomeroomPage = () => {
  const { schoolName, homeroom } = useParams();
  const [studentsList, setStudentsList] = useState([]);
    const navigate = useNavigate()

  const baseServerURL = config.baseServerURL;

  const getStudentList = async () => {
    const students = await axios.get(`${baseServerURL}/students/list`, {
      params: {
        schoolName: schoolName,
        homeroom: homeroom,
      },
    });
    console.log(students.data);
    setStudentsList(students.data);
  };

  useEffect(() => {
    getStudentList();
  }, []);

  const handleClick = (studentID) => {
    navigate(`/id/${studentID}`)
  };

  const createStudentList = () => {
    let studentList = [];
    for (let i = 0; i < studentsList.length; i++) {
      studentList.push(
        <tr
          className="student-table-row"
          key={studentsList[i].studentID}
          onClick={() => {
            handleClick(studentsList[i].studentID);
          }}
        >
          <td className="student-table-cell">{studentsList[i].studentID}</td>
          <td className="student-table-cell">{studentsList[i].firstName}</td>
          <td className="student-table-cell">{studentsList[i].lastName}</td>
        </tr>
      );
    }

    return studentList;
  };

  return (
    <div className="homeroom-page">
      <h1>
        Students in homeroom {homeroom} in building {schoolName}
      </h1>
      <table className="student-table">
        <thead>
          <tr className="student-table-header">
            <th className="student-table-cell">Student ID</th>
            <th className="student-table-cell">First Name</th>
            <th className="student-table-cell">Last Name</th>
          </tr>
        </thead>
        <tbody>{createStudentList()}</tbody>
      </table>
    </div>
  );
};

export default HomeroomPage;

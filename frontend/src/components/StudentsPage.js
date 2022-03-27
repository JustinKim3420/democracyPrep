import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const StudentsPage = () => {
  const [studentInfo, setStudentInfo] = useState({
    numberOfPresent: 0,
    numberOfClasses: 0,
    firstName: "",
    lastName: "",
    gender: "",
    ethnicity: "",
    studentID: "",
    courses: [],
  });
  console.log(studentInfo);
  const [studentID, setStudentID] = useState(parseInt(useParams().studentID));
  const baseServerURL = config.baseServerURL;

  //These functions are gonna take a long time as the data was not aggregated
  //and we'll have to go through the entire data set
  const getStudentAttendance = async (attendanceData) => {
    const data = await axios.get(`${baseServerURL}/attendance`, {
      params: {
        studentID: studentID,
      },
    });
    return {
      numberOfPresent: data.data.numberOfPresent,
      numberOfClasses: data.data.numberOfClasses,
    };
  };

  const getStudentInfo = async () => {
    const data = await axios.get(`${baseServerURL}/students/studentInfo`, {
      params: {
        studentID: studentID,
      },
    });
    console.log(data.data);

    return {
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      gender: data.data.gender,
      ethnicity: data.data.ethnicity,
      studentID: data.data.studentID,
      school: data.data.school,
      grade: data.data.grade,
      homeroom: data.data.home,
    };
  };

  const getStudentCourses = async () => {
    console.log("getStudentCourses");

    const data = await axios.get(`${baseServerURL}/grades`, {
      params: {
        studentID: studentID,
      },
    });

    console.log(data.data);

    return data.data.courses
  };

  const initializeData = async () => {
    const attendance = await getStudentAttendance();
    const student = await getStudentInfo();
    const courses = await getStudentCourses();

    setStudentInfo({
      ...attendance,
      ...student,
      courses:courses,
    });
  };

  useEffect(() => {
    initializeData();
  }, []);

  const createRows = (data) => {
    let tableRows = [];
    for (let i = 0; i < data.length; i++) {
      tableRows.push(
        <tr key={`${data[i].schoolYear}-${data[i].term}-${data[i].courseCode}`}>
          <td>{data[i].schoolYear}</td>
          <td>{data[i].term}</td>
          <td>{data[i].subject}</td>
          {data[i].percent ? <td>{data[i].percent}</td> : <td>N/A</td>}
        </tr>
      );
    }

    return tableRows;
  };

  return (
    <div className="student-profile">
      <div className="header">
        <div className="header-item">
          {studentInfo.firstName} {studentInfo.lastName}
        </div>
        <div className="header-item">ID: {studentInfo.studentID}</div>
        <div className="header-item">
          Attendance: {studentInfo.numberOfPresent}/
          {studentInfo.numberOfClasses}
        </div>
        <div className="header-item">Grade: {studentInfo.grade}</div>
        <div className="header-item">Homeroom: {studentInfo.homeroom}</div>
      </div>
      <div className="courses">
        <h1>Courses Taken</h1>
        <table>
          <thead>
            <tr>
              <th>School year</th>
              <th>Term</th>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>{createRows(studentInfo.courses)}</tbody>
        </table>
      </div>
    </div>
  );
};
export default StudentsPage;

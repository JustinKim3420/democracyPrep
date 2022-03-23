import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const ResultsPage = () => {
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

  const getData = async () => {
    const rawData = await axios.get(`${baseServerURL}/student/`);
    return rawData.data;
  };

  //These functions are gonna take a long time as the data was not aggregated
  //and we'll have to go through the entire data set
  const getStudentAttendance = (attendanceData) => {
    console.log("getStudentAttendance");
    let studentFound = false;
    let presentCount = 0;
    let classesCount = 0;

    //Assumes that the specific student's data is grouped together
    for (let i = 0; i < attendanceData.length; i++) {
      if (studentFound === false) {
        if (attendanceData[i].StudentID === studentID) {
          studentFound = true;
          classesCount++;
          if (attendanceData[i].Type === "present") {
            presentCount++;
          }
        }
      } else {
        if (attendanceData[i].StudentID !== studentID) {
          break;
        } else {
          classesCount++;
          if (attendanceData[i].Type === "present") {
            presentCount++;
          }
        }
      }
    }
    return {
      numberOfPresent: presentCount,
      numberOfClasses: classesCount,
    };
  };

  const getStudentInfo = (studentsData) => {
    console.log("getStudentInfo");
    for (let i = 0; i < studentsData.length; i++) {
      if (studentsData[i].StudentID === studentID) {
        return {
          firstName: studentsData[i].FirstName,
          lastName: studentsData[i].LastName,
          gender: studentsData[i].Gender,
          ethnicity: studentsData[i].RaceEthnicity,
          studentID: studentsData[i].StudentID,
          school: studentsData[i].BuildingCode,
          grade: studentsData[i].GradeLevel,
          homeroom: studentsData[i].Homeroom,
        };
      }
    }
  };

  const getStudentCourses = (coursesData) => {
    console.log("getStudentCourses");
    let studentFound = false;
    let courses = [];

    //Assumes that the specific student's data is grouped together
    for (let i = 0; i < coursesData.length; i++) {
      if (studentFound === false) {
        if (coursesData[i].StudentID === studentID) {
          studentFound = true;
          courses.push({
            schoolYear: coursesData[i].SchoolYear,
            term: coursesData[i].Term,
            subject: coursesData[i].Subject,
          });
        }
      }

      if (studentFound === true) {
        if (coursesData[i].StudentID !== studentID) {
          break;
        } else {
          courses.push({
            schoolYear: coursesData[i].SchoolYear,
            term: coursesData[i].Term,
            subject: coursesData[i].Subject,
          });
        }
      }
    }

    return {
      courses: courses,
    };
  };

  const initializeData = async () => {
    const data = await getData();
    console.log(data);

    const attendance = getStudentAttendance(data.attendance);
    const student = getStudentInfo(data.studentsData);
    const courses = getStudentCourses(data.grades);

    console.log(attendance);
    console.log(student);
    console.log(courses);

    setStudentInfo({
      ...attendance,
      ...student,
      ...courses,
    });
  };

  useEffect(() => {
    initializeData();
  }, []);

  const createRows = (data) => {
    let tableRows = []
    for(let i=0; i<data.length;i++){
        tableRows.push(
            <tr>
                <td>{data[i].schoolYear}</td>
                <td>{data[i].term}</td>
                <td>{data[i].subject}</td>
            </tr>
        )
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
        <h1>Courses</h1>
        <table>
          <tr>
            <th>School year</th>
            <th>Term</th>
            <th>Course</th>
          </tr>
          {createRows(studentInfo.courses)}
        </table>
      </div>
    </div>
  );
};
export default ResultsPage;

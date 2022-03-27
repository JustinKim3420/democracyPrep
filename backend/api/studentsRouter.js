const xlsx = require("xlsx");
const express = require("express");
const router = express.Router();

const students = xlsx.readFile("./data/Students_NYTest_2020-2021_(2).xlsx");
const studentsSheetNames = students.SheetNames;
const studentsData = xlsx.utils.sheet_to_json(
  students.Sheets[studentsSheetNames[0]]
);

router.get("/schools", (req, res) => {
  let schools = {};
  let schoolArray = [];
  for (let i = 0; i < studentsData.length; i++) {
    if (!schools[studentsData[i].BuildingCode]) {
      schools[studentsData[i].BuildingCode] = 1;
      schoolArray.push(studentsData[i].BuildingCode);
    }
  }
  res.send(schoolArray);
});

router.get("/homerooms", (req, res) => {
  const schoolName = req.query.school;
  let homerooms = {};
  let homeroomArray = [];

  for (let i = 0; i < studentsData.length; i++) {
    if (
      studentsData[i].BuildingCode !== schoolName ||
      !studentsData[i].Homeroom
    ) {
      continue;
    } else if (!homerooms[studentsData[i].Homeroom]) {
      homerooms[studentsData[i].Homeroom] = 1;
      homeroomArray.push(studentsData[i].Homeroom);
    }
  }
  res.send(homeroomArray);
});

router.get("/list", (req, res) => {
  const schoolName = req.query.schoolName;
  const homeroom = req.query.homeroom;
  let studentList = [];
  let studentID = {};

  for (let i = 0; i < studentsData.length; i++) {
    if (studentID[studentsData[i].StudentID]) {
      continue;
    }
    if (
      studentsData[i].BuildingCode === schoolName &&
      studentsData[i].Homeroom === homeroom
    ) {
      studentList.push({
        firstName: studentsData[i].FirstName,
        lastName: studentsData[i].LastName,
        studentID: studentsData[i].StudentID,
      });
      studentID[studentsData[i].StudentID] = 1;
    }
  }

  res.send(studentList);
});

router.get("/studentInfo", (req, res) => {
  const studentID = parseInt(req.query.studentID);
  console.log("stduent info");

  for (let i = 0; i < studentsData.length; i++) {
    if (studentsData[i].StudentID === studentID) {
      res.send({
        firstName: studentsData[i].FirstName,
        lastName: studentsData[i].LastName,
        gender: studentsData[i].Gender,
        ethnicity: studentsData[i].RaceEthnicity,
        studentID: studentsData[i].StudentID,
        school: studentsData[i].BuildingCode,
        grade: studentsData[i].GradeLevel,
        homeroom: studentsData[i].Homeroom,
      });
    }
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");

const grades = xlsx.readFile("./data/Grades_NYTest_2020-2021_(1).xlsx");
const gradesSheetNames = grades.SheetNames;
const gradesData = xlsx.utils.sheet_to_json(grades.Sheets[gradesSheetNames[0]]);

router.get("/", (req, res) => {
  const studentID = parseInt(req.query.studentID);
  console.log('getting grades')
  let studentFound = false;
  let courses = [];

  //Assumes that the specific student's data is grouped together
  for (let i = 0; i < gradesData.length; i++) {
    if (studentFound === false) {
      if (gradesData[i].StudentID === studentID) {
        studentFound = true;
        courses.push({
          schoolYear: gradesData[i].SchoolYear,
          term: gradesData[i].Term,
          subject: gradesData[i].Subject,
          percent: gradesData[i].Percent,
          courseCode: gradesData[i].CourseCode,
        });
      }
    } else {
      if (gradesData[i].StudentID !== studentID) {
        break;
      } else {
        courses.push({
          schoolYear: gradesData[i].SchoolYear,
          term: gradesData[i].Term,
          subject: gradesData[i].Subject,
          percent: gradesData[i].Percent,
          courseCode: gradesData[i].CourseCode,
        });
      }
    }
  }

  res.send ({
    courses: courses,
  });
});

module.exports = router;

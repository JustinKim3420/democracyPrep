const xlsx = require("xlsx");
const express = require("express");
const router = express.Router();

const attendance = xlsx.readFile("./data/Attendance_NYTest_2020-2021_(2).xlsx");
const attendanceSheetNames = attendance.SheetNames;
const attendanceData = xlsx.utils.sheet_to_json(
  attendance.Sheets[attendanceSheetNames[0]]
);

router.get("", (req, res) => {
  console.log("getStudentAttendance");
  const studentID = parseInt(req.query.studentID);
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
  res.send({
    numberOfPresent: presentCount,
    numberOfClasses: classesCount,
  });
});

module.exports = router;

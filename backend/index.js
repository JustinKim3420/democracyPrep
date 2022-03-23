const express = require('express')
const xlsx = require('xlsx')
const fs = require('fs')
const cors =require('cors')
const { query } = require('express')

const app = express()
const PORT = 4000;

app.use(cors())

const attendance = xlsx.readFile('./data/Attendance_NYTest_2020-2021_(2).xlsx')
const attendanceSheetNames = attendance.SheetNames
const attendanceData = xlsx.utils.sheet_to_json(attendance.Sheets[attendanceSheetNames[0]])

const grades = xlsx.readFile('./data/Grades_NYTest_2020-2021_(1).xlsx')
const gradesSheetNames = grades.SheetNames
const gradesData = xlsx.utils.sheet_to_json(grades.Sheets[gradesSheetNames[0]])

const students = xlsx.readFile('./data/Students_NYTest_2020-2021_(2).xlsx')
const studentsSheetNames = students.SheetNames
const studentsData = xlsx.utils.sheet_to_json(students.Sheets[studentsSheetNames[0]])

app.get('/student',(req,res)=>{
    console.log('get request')
    res.send({
        attendance:attendanceData,
        grades: gradesData,
        studentsData: studentsData
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

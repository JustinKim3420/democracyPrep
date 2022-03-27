const express = require('express')
const cors =require('cors')

const app = express()
const PORT = 4000;

app.use(cors())

app.use('/attendance', require('./api/attendenceRouter'))
app.use('/grades', require('./api/gradesRouter'))
app.use('/students', require('./api/studentsRouter'))

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

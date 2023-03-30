// import packages

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var cookieParser = require('cookie-parser')



const app = express();


app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(cookieParser())

//import connection
const {connection}  = require("./Config/db")


//import models
const {UserModel} = require('./Models/User.model')
const {StudentModel}= require("./Models/student.model")


//middleware
const {authenticate} = require('./middlewares/Authentication')
const {validate} = require('./middlewares/signup_validate')


// import Routes
const {UserRouter} = require('./Routes/user.route')
const {StudentRouter} = require('./Routes/student.route')
const {TeacherRouter} = require('./Routes/teacher.route')



//Api End points
app.use('/userRoutes',UserRouter)
app.use("/scheduler/student",authenticate,StudentRouter)
app.use("/scheduler/teacher",TeacherRouter)



app.get("/",(req,res)=>{
    res.send("ok")
})




app.listen(9090, async () => {
    try {
      await connection;
      console.log("connected to db");
      console.log("listening in port 9090");
    } catch (err) {
      console.log(err);
      console.log("error in connecting");
    }
});

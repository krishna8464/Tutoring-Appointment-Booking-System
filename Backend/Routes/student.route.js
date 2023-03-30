const express =  require("express")
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {StudentModel}=require('../Models/student.model');

const StudentRouter = express.Router()
StudentRouter.use(cookieParser())

StudentRouter.post("/addDetails",(req,res)=>{
    const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token

    const {address,standard,subjects,courseDetails} = req.body
  
    jwt.verify(token,process.env.Token_Pass,async function(err,decoded){
        if(err){
            res.status(401).send({"msg":"please login","err":err.message})
        }
        else{
            const studentDetail = {
                studentId :decoded.userid,
                name:decoded.name,
                email:decoded.email,
            }
            const student = new StudentModel({studentDetail,address,standard,subjects,courseDetails})
            await student.save()
            res.send("ok")
        }
    })
})


module.exports = {StudentRouter}



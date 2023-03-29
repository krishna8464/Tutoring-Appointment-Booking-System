const express =  require("express")
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {TeacherModel}=require('../Models/teacher.model');

const TeacherRouter = express.Router()
TeacherRouter.use(cookieParser())

TeacherRouter.post("/addDetails",(req,res)=>{
    const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token

    const {address,qualification,experience,expertise,rating} = req.body
  
    jwt.verify(token,process.env.Token_Pass,async function(err,decoded){
        if(err){
            res.status(401).send({"msg":"please login","err":err.message})
        }
        else{
            const teacherDetail = {
                teacherId :decoded.userid,
                name:decoded.name,
                email:decoded.email,
                mobile:decoded.mobile,
                gender:decoded.gender
            }
            const student = new TeacherModel({teacherDetail,address,qualification,experience,expertise,rating})
            await student.save()
            res.send("ok")
        }
    })
})


module.exports = {TeacherRouter}



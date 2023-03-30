const express =  require("express")
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {TeacherModel}=require('../Models/teacher.model');
const {authenticate} = require('../middlewares/Authentication')

const TeacherRouter = express.Router()
TeacherRouter.use(cookieParser())

TeacherRouter.post("/addDetails",authenticate,(req,res)=>{
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
            }
            const student = new TeacherModel({teacherDetail,address,qualification,experience,expertise,rating})
            await student.save()
            res.send("ok")
        }
    })
})

//get All Teacher Details
TeacherRouter.get("/getAllTeacher",async(req,res)=>{
    const Teachers = await TeacherModel.find()
    res.send(Teachers)
})


module.exports = {TeacherRouter}



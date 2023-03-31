const express =  require("express")
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Redis = require('ioredis');

const {TeacherModel}=require('../Models/teacher.model');
const {authenticate} = require('../middlewares/Authentication')
const { UserModel} = require('../Models/User.model')


const redis = new Redis({
    port: 14080,
    host: process.env.redish_host,
    password: process.env.redish_password
})

const TeacherRouter = express.Router()
TeacherRouter.use(cookieParser())

TeacherRouter.post("/addDetails",async(req,res)=>{
    const SignUpToken = await redis.get('signupToken')
    //console.log(SignUpToken)
    const { mobile,gender,address,qualification,experience,expertise} = req.body
  
    jwt.verify(SignUpToken,process.env.Signup_pass,async function(err,decoded){
        if(err){
            res.status(401).send({"msg":"please login","err":err.message})
        }
        else{
            const teacherDetail = {
                teacherId :decoded.userid,
                name:decoded.name,
                email:decoded.email,
            }

            const student = new TeacherModel({teacherDetail,mobile,gender,address,qualification,experience,expertise})
            await student.save()
            await redis.getdel('signupToken')
            
            let update = {isActive:true}
            let filter = {email:decoded.email}
            await UserModel.findOneAndUpdate(filter,update)

            res.send({ 'msg': "details added" })
        }
    })
})

//get All Teacher Details
TeacherRouter.get("/getAllTeacher",async(req,res)=>{
    const Teachers = await TeacherModel.find()
    res.send(Teachers)
})


module.exports = {TeacherRouter}



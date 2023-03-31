const express =  require("express")
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Redis = require('ioredis');

const redis = new Redis({
    port: 14080,
    host: process.env.redish_host,
    password: process.env.redish_password
})

const {StudentModel}=require('../Models/student.model');

const StudentRouter = express.Router()
StudentRouter.use(cookieParser())

StudentRouter.post("/addDetails",async(req,res)=>{   
    const SignUpToken = await redis.get('signupToken')
    console.log(SignUpToken)
    const {mobile,gender,address,standard,subjects,courseDetails} = req.body
  
    jwt.verify(SignUpToken,process.env.Signup_pass,async function(err,decoded){
        if(err){
            res.status(401).send({"msg":"jwt not matched","err":err.message})
        }
        else{
            const studentDetail = {
                studentId :decoded.userid,
                name:decoded.name,
                email:decoded.email,
            }
            const student = new StudentModel({studentDetail,address,standard,subjects,courseDetails,mobile,gender})
            await student.save()
            await redis.getdel('signupToken')

            let update = {isActive:true}
            let filter = {email:decoded.email}
            await UserModel.findOneAndUpdate(filter,update)
            res.send({ 'msg': "details added" })
        }
    })
})


StudentRouter.get('/allStudents',async (req,res)=>{
    const Students = await TeacherModel.find()
    res.send(Students)
})

module.exports = {StudentRouter}



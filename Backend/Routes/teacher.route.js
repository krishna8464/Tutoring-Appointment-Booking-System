const express =  require("express")
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Redis = require('ioredis');

const {TeacherModel}=require('../Models/teacher.model');
const {authenticate} = require('../middlewares/AdminAuthentication')
const { UserModel} = require('../Models/User.model')


const redis = new Redis({
    port: 14080,
    host: process.env.redish_host,
    password: process.env.redish_password
})

const TeacherRouter = express.Router()
TeacherRouter.use(cookieParser())


//add new teachers

TeacherRouter.post("/addDetails",async(req,res)=>{
    const SignUpToken = await redis.get('signupToken')
    const { mobile,gender,address,qualification,experience,expertise} = req.body

    try{
        
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
                const  Teacher_Booking_id = Math.ceil(Math.random()*10000)
                const student = new TeacherModel({teacherDetail,mobile,gender,address,qualification,experience,expertise,Teacher_Booking_id})
                await student.save()
                await redis.getdel('signupToken')
                
                let update = {isActive:true}
                let filter = {email:decoded.email}
                await UserModel.findOneAndUpdate(filter,update)

                res.send({ 'msg': "details added" })
            }
        })

    }
    catch(err){
        res.send({"msg":"someting wrong"})
    }
  
})



//get All Teacher Details
TeacherRouter.get("/getAllTeacher",async(req,res)=>{
    const Teachers = await TeacherModel.find()
    res.send(Teachers)
})


//update teacher
TeacherRouter.patch("/update/TeacherDetails",authenticate, async(req,res)=>{
    const id  = req.body.userid ;
    const data = req.body
    console.log(data)
    try{
        let filter = {_id:id}
        await TeacherModel.findOneAndUpdate(filter,data)
        res.send("data updated")
    }
    catch(err){
        res.send(err)
    }
   
})


//delete teacher
TeacherRouter.delete("/delete/TeacherDetails",authenticate, async(req,res)=>{
    const id  = req.body.userid ;
    try{
        await TeacherModel.findOneAndDelete(id)
        res.send("app deleted")
    }
    catch(err){
        res.send(err)
    }
        
})




module.exports = {TeacherRouter}



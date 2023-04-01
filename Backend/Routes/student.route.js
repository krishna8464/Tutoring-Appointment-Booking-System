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
const {authenticate} = require('../middlewares/AdminAuthentication')
const {UserModel} = require('../Models/User.model')

const StudentRouter = express.Router()
StudentRouter.use(cookieParser())



//Add details
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


//get all student
StudentRouter.get('/allStudents',async (req,res)=>{
    const Students = await TeacherModel.find()
    res.send(Students)
})


//update student
StudentRouter.patch("/update/studentDetails",authenticate, async(req,res)=>{
    const id  = req.body.userid ;
    const data = req.body
    console.log(data)
    try{
        let filter = {_id:id}
        await StudentModel.findOneAndUpdate(filter,data)
        res.send("data updated")
    }
    catch(err){
        res.send(err)
    }
   
})


//delete student
StudentRouter.delete("/delete/StudentDetails",authenticate, async(req,res)=>{
    const id  = req.body.userid ;
    try{
        await StudentModel.findOneAndDelete(id)
        res.send("app deleted")
    }
    catch(err){
        res.send(err)
    }
        
})




module.exports = {StudentRouter}



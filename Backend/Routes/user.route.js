const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()
var cookieParser = require('cookie-parser')
const Redis = require('ioredis');


const redis = new Redis({
    port: 14080,
    host: process.env.redish_host,
    password: process.env.redish_password
})


const {UserModel}=require('../Models/User.model');

const UserRouter = express.Router()

UserRouter.use(cookieParser())

const {validate} = require('../middlewares/signup_validate');
const { TeacherModel } = require('../Models/teacher.model');
const {StudentModel} = require("../Models/student.model")




//signup
UserRouter.post('/signup',validate, async (req, res) => {
    const { email, password, name ,avatar,isAdmin,isActive} = req.body;
    const check = await UserModel.find({ email });
    if(!check.length){
        bcrypt.hash(password, 6, async function (err, hash) {
            if (err) {
                res.status(500).send({ 'msg': "Something went wrong" })
            }
            else {
                try {

                    let userId = Math.ceil(Math.random() * 10000)
                    const user= new UserModel({ email, password: hash, name, avatar,isActive,isAdmin })
                    await  user.save()


                    let u = await UserModel.findOne({email})
                    console.log(u._id,"hi")

                    const signupToken = jwt.sign({userid:u._id,email:email,name:name}, process.env.Signup_pass)
                    redis.set('signupToken',signupToken)


                    let userName = name
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD,
                            clientId: process.env.CLIENT_ID,
                            clientSecret: process.env.CLIENT_SECRET,
                            refreshToken: process.env.REFRESH_TOKEN
                        }
                    });
    
                    const mailConfigurations = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: `Thank you for registering.Take control of your career with Scheduler`,   
                        html:`
                        <div style="width:100%;">
                            <div style="width:50%;margin:auto;background:transparant ;display:flex; justify-content: center;">
                                <img style="width:50%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_PwLMKiU1feYbcoxs34k3Gg7cQbVH0xdG98cM-8-6YSvh-chAqE9NA48Sjad8qx9xeg&usqp=CAU"/>
                            </div>
                            <h1 style="text-align:center;"> Hello ${userName}</h1>
                            <div style="text-align:center; font-family:robot,'sens-serif'; display:flex; width:100%">
                                <p style="width: 50%; font-family:robot,'sens-serif'; font-size: 25px;">Thank you  for registering with Scheduler, India's fastest growing career institute <br> Visit our website www.example.com for latest updates. </p>
                                <img style="width:50%" src="https://i.pinimg.com/originals/b0/a5/11/b0a511db97423cae060e667746da77de.jpg"/>
                            </div>
                            <div style="width:fit-content;margin:50px auto;">
                            
                            </div>
                            <h4>Regards, <br> Schedular Team</h4>
                        </div>`
              
                    };
                    
    
                    transporter.sendMail(mailConfigurations, async function (error, info) {
                        if (error) {
                            console.log('ERR: Error from nodemailer')
                            console.log(error)
                            res.status(500).send({ "msg": "Something went wrong" })
                        } else {
                            console.log('Email Sent Successfully');
                            res.status(201).send({ "msg": `Signup Successfully`, "email": email })
    
                        }
                    })
                }

                catch (err) {
                    console.log(err);
                    res.status(401).send({ "msg": "Something went wrong" })
                }
            }
        })
    }
    else{
        res.send("User already exist")
    }
   
})


//login
UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const teacher =  await TeacherModel.find({});
    const student = await StudentModel.find({'studentDetail.email': email})
    
    let u 
    let stats  = false
    let userdetials 
    for(let i=0;i<teacher.length;i++){
        let ele = teacher[i]
        if(ele.teacherDetail.email==email){
            u = ele._id 
            stats = true
            userdetials=ele
            break      
        }
    }
    if(stats===false){
        userdetials=student
    }


   
    console.log(student)

   
    if (user) {
        try {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ 'msg': "Something went wrong" })
                }
                else if (result) {
                    const token = jwt.sign({userid:u,email:user.email,isAdmin:user.isAdmin,name:user.name,email:user.email }, process.env.Token_Pass, { expiresIn: '5d' })

                    let update = {isActive:true}
                    let filter = {email:email}
                    await UserModel.findOneAndUpdate(filter,update)

                    res.cookie("token",token,{httpOnly:true})
                    res.setHeader("token",token)
                    res.status(201).send({"msg":"Login successfull","username":user.name,"userEmail":user.email,"userdet":user,"extdet":userdetials })
                }
                else {
                    res.send({ 'msg': "incorrect password" })
                }
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ "msg": "Somethng went wrong" })
        }
    }
    else {
        res.status(401).send({ "msg": "Invailid credentials" })
    }
})


//logout
UserRouter.get("/logout",async(req,res)=>{
    try{
        const token = req.cookies.token;
        if(token){
            jwt.verify(token,process.env.Token_Pass,async function(err,decoded){
                if(err){
                    res.status(401).send({"msg":"some Error","err":err.message})
                }
                else{
                    let email = decoded.email
                    let update = {isActive:false}
                    let filter = {email:email}
                    await UserModel.findOneAndUpdate(filter,update)
                    res.clearCookie('token');
                    
                    res.sendStatus(200);
       
                }
            })
        }
        
      
    }
    catch(err){
        res.status(500).send({ "msg": "Somethng went wrong" })
    }
   
})



//forgotPassword
UserRouter.post('/forgotPasword',async (req,res)=>{
    const {email} =  req.body
    console.log(email)
    try{
        let otp = Math.ceil(Math.random() * 10000)
       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });
        const mailConfigurations = {
            from: process.env.EMAIL,
            to: email,
            subject: `Reset Password`,    
            html:`<div style="width:100%;">
                <div>
                    <p>Enter the OTP:${otp} to reset your password </p>
                    <p>Redirect to Our Website www.example.com </p>
                </div>      
                <h4>Regards, <br> Schedular Team</h4>
            </div>`
  
        };

        transporter.sendMail(mailConfigurations, async function(error, info) {
            if (error) {
                console.log('ERR: Error from nodemailer')
                console.log(error)
                res.status(500).send({ "msg": "Something went wrong with message service" })
            } else {
                console.log('Email Sent Successfully');
                res.cookie("VerifyOtp",otp,{httpOnly:true})
                res.cookie("VerifyEmail",email,{httpOnly:true})
                res.status(201).send({ "msg": `otp send`, "email": email })

            }
        })

    }
    catch(err){
        console.log(err);
        res.status(500).send({ "msg": "Somethng went wrong" })
    }
})


//verify OTP
UserRouter.post('/verifyOTP', async (req, res) => {
    let { otp } = req.body;
    if (!otp) return res.status(401).send({ 'msg': "Please enter otp" })
    try {
        const VerifyOtp = req.cookies.VerifyOtp;
        if(otp === VerifyOtp){
             res.clearCookie('VerifyOtp');
            res.status(200).send({ "msg": 'otp Verified' })
        }
    }
    catch (err) {
        res.status(500).send({ "msg": 'Something went wrong' })

    }
})


//changepassword

UserRouter.post('/changePassword',async(req,res)=>{
    let {password} = req.body
    let email = req.cookies.VerifyEmail
    //console.log(password,email)
    try{
        if(email){
           
            bcrypt.hash(password, 6, async function (err, hash) {
                if(err){
                    res.send(err)
                }
                else{
                    let update = {password:hash}
                    let filter = {email:email}
                    await UserModel.findOneAndUpdate(filter,update)
                    res.clearCookie('VerifyEmail');
                    res.status(200).send({ "msg": 'password updated' })
                }

            })

        }

    }
    catch(err){
        res.send(err)
    }
    


})




module.exports = { UserRouter}
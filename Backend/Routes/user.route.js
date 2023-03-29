const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()
var cookieParser = require('cookie-parser')

const {UserModel}=require('../Models/User.model');

const UserRouter = express.Router()

UserRouter.use(cookieParser())


UserRouter.post('/signup', async (req, res) => {
    const { email, password, mobile, name ,avatar,gender,isAdmin,isActive} = req.body;
    const check = await UserModel.find({ email });
    if(!check.length){
        bcrypt.hash(password, 6, async function (err, hash) {
            if (err) {
                res.status(500).send({ 'msg': "Something went wrong" })
            }
            else {
                try {
                    const user= new UserModel({ email, password: hash, name, mobile,avatar,gender,isActive,isAdmin })
                    await  user.save()
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
                            res.status(201).send({ "msg": `Login Successfully`, "email": email })
    
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


UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user)
   
    if (user) {
        try {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ 'msg': "Something went wrong" })
                }
                else if (result) {
                    const token = jwt.sign({ userid: user._id,email:user.email,isAdmin:user.isAdmin,"name":user.name,"email":user.email,"mobile":user.mobile,"gender":user.gender }, process.env.Token_Pass, { expiresIn: '5d' })

                    let update = {isActive:true}
                    let filter = {email:email}
                    await UserModel.findOneAndUpdate(filter,update)

                    res.cookie("token",token,{httpOnly:true})
                    res.setHeader("token",token)
                    res.status(201).send({"msg":"Login successfull"})
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


UserRouter.post("/logout",(req,res)=>{
    let isActive = req.body
    

})


module.exports = { UserRouter}
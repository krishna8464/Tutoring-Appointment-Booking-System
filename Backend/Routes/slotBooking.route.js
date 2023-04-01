const express = require('express');
const nodemailer = require('nodemailer');

const BookingRouter = express.Router();
const {BookingModel}  = require("../Models/booking")
const {CourseModel} = require("../Models/course.model")
const {TeacherModel} = require("../Models/teacher.model")




//get all booking
BookingRouter.get("/allbooking",async(req,res)=>{
    let booking = await BookingModel.find()
    res.status(201).send({ "booking": booking })
})


// search all teacher with name
BookingRouter.post("/searchTeacher",async(req,res)=>{
    const {name} =  req.body
    console.log(name)
    try{
        const teacher = await TeacherModel.find({"teacherDetail.name":name})
        res.send(teacher)
    }
    catch(err){
        res.status(500).send({"msg":"internal error" ,"error":err})
    }
    

})




//slot Booking
BookingRouter.post("/slotBooking", async(req,res)=>{
    var startDate  = Date.now() 
    
    const {StudentName, email,phone,courseName,teacherName,Teacher_Booking_id,slot} = req.body;
    
    try{
        const course = await CourseModel.findOne({courseName})
        const {duration,fees} = course
        console.log(duration,fees)
       
        let teacherAvail = 0
        let slotName = ""
       const teacher = await TeacherModel.findOne({Teacher_Booking_id:Teacher_Booking_id})
       // console.log(teacher)
        if(teacher.length != 0){
            let slots = teacher.slots
            for(let j in slots){
                if(j==slot && slots[j]==false){
                    teacherAvail = 1
                    slotName = j
                    break
                }
             }
            
        }
        else{
            res.status(201).send({"msg":"Teacher Not exists"})
        }


        if(teacherAvail ==1){
            let filter = {Teacher_Booking_id}
           if(slotName=="slot1"){
            let update = {"slots.slot1":true}
            console.log(update)
            await TeacherModel.findOneAndUpdate(filter,update)
           }
           else if(slotName=="slot2"){
            let update = {"slots.slot2":true}
            console.log(update)
            await TeacherModel.findOneAndUpdate(filter,update)
           }
           else if(slotName=="slot3"){
            let update = {"slots.slot3":true}
            console.log(update)
            await TeacherModel.findOneAndUpdate(filter,update)
           }
           else if(slotName=="slot4"){
            let update = {"slots.slot4":true}
            console.log(update)
            await TeacherModel.findOneAndUpdate(filter,update)
           }
           else{
                res.send("slots not Available")
           }
           
                 
        }
        else{
            res.status(201).send({"msg":"Slots are full"})
        }

        let book = new BookingModel({StudentName, email,phone,courseName,teacherName,Teacher_Booking_id,duration:duration,fees:fees, startDate})
        await book.save()
    
        res.send({"msg":"Booking Confirmed","avail":teacherAvail})

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
            subject: `Thank you for Booking`,   
            html:`
            <div style="width:100%;">
                <P>Booking Successful </p>
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
                res.status(201).send({ "msg": `Booking Successfully`, "email": email })
    
            }
        })
        
       
    }
    catch(err){
        res.status(500).send(err)
    }

})




module.exports = {BookingRouter}




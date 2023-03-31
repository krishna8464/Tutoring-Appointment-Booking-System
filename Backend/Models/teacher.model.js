const mongoose = require("mongoose")


const teacherSchema  =  mongoose.Schema({
    //Teacher_id: String,
    teacherDetail:{
        teacherId:String,
        name:String,
        email:String,
    },
    mobile:Number,
    gender:String,
    address:{
        city:String,
        state:String,
        pincode:Number
    },
    qualification:String,
    experience:String,
    expertise:[String],
    rating:String
})

const TeacherModel =  mongoose.model("teacher",teacherSchema)
module.exports = {TeacherModel}
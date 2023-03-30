const mongoose = require("mongoose")


const studentSchema  =  mongoose.Schema({
    studentDetail:{
        studentId:String,
        name:String,
        email:String,
},
    address:{
        city:String,
        state:String,
        pincode:Number
    },
    standard:String,
    subjects:[String],
    courseDetails:{
        courseName:String,
        price:Number
    }

})

const StudentModel =  mongoose.model("student",studentSchema)
module.exports = {StudentModel}
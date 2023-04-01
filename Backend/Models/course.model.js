const mongoose = require("mongoose")


const courseSchema  =  mongoose.Schema({
   subjectName:[String],
   courseName:{type:String,lowercase: true, trim: true},
   duration:String,
   fees:Number
})

const CourseModel =  mongoose.model("course",courseSchema )
module.exports = {CourseModel}
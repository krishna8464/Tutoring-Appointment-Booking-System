const mongoose = require("mongoose")


const teacherSchema  =  mongoose.Schema({
    Teacher_Booking_id: Number,
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
    rating:String,
    slots:{
        slot1:{type:Boolean, default:false},
        slot2:{type:Boolean, default:false},
        slot3:{type:Boolean, default:false},
        slot4:{type:Boolean, default:false}
    }
        
})

const TeacherModel =  mongoose.model("teacher",teacherSchema)
module.exports = {TeacherModel}
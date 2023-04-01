const express = require('express');


const {CourseModel} = require('../Models/course.model');
const CourseRouter = express.Router();


//Add Courses
CourseRouter.post('/AddCourse', async (req, res) => {
  try {
    const {subjectName,courseName,duration,fees} = req.body;
    const course = new CourseModel({subjectName,courseName,duration,fees})
    await course.save();
    res.status(201).send({"msg":"course added","course":course});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  }
});


//All courses
CourseRouter.get("/allCourse", async(req,res)=>{
    try{
        const course= await CourseModel.find()
        res.status(201).send({"course":course});
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
})

module.exports = {CourseRouter} ;
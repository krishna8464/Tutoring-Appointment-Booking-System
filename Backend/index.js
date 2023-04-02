// import packages
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var cookieParser = require('cookie-parser')
const morgan =  require("morgan")

const app = express();

//packages use
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    origin: '*'
}))
app.use(cookieParser())


//import connection
const {connection}  = require("./Config/db")



// import Routes
const {passport}=require('./Config/googleAuth')
const {UserRouter} = require('./Routes/user.route')
const {StudentRouter} = require('./Routes/student.route')
const {TeacherRouter} = require('./Routes/teacher.route')
const {FeedbackRouter} = require("./Routes/feedback.route")
const {BookingRouter} = require("./Routes/slotBooking.route")
const {CourseRouter} = require('./Routes/course.route')



//Api End points
app.use('/userRoutes',UserRouter)
app.use("/scheduler/student",StudentRouter)
app.use("/scheduler/teacher",TeacherRouter)
app.use("/feedback",FeedbackRouter)
app.use("/booking",BookingRouter)
app.use('/course',CourseRouter)



app.get("/",(req,res)=>{
    res.send("ok")
})



//googleAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/userRoutes/login',session:false}),
  function({user}, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign({ userid: user._id,email:user.email,isAdmin:user.isAdmin,"name":user.name,"email":user.email,"mobile":user.mobile,"gender":user.gender }, process.env.Token_Pass, { expiresIn: '5d' })
    res.cookie("token",token,{httpOnly:true})
    res.status(201).send({'msg':'Login succesfull','token':token})
    
});





app.listen(9090, async () => {
    try {
      await connection;
      console.log("connected to db");
      console.log("listening in port 9090");
    } catch (err) {
      console.log(err);
      console.log("error in connecting");
    }
});

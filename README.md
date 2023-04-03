## Tutoring Appointment Booking System


## Description


- We have developed this REST API for an Tutor Booking application. This API performs all the fundamental CRUD operations of any Tutor Booking platform with user validation at every step.
- This project is developed by team of 5 Back-end Developers during project week in Masai School.

## Techstack

- JavaScript
- MongoDB
- Nodejs
- Express
- Redis
- HTML
- CSS
- Boostrap

## Modules

- User Module
- Teacher Module
- Student Module
- Cource Module
- Booking Module
- Feedback Module

## ER Diagram
Following ER diagram indicates the database tables and thier interaction which we are using.
![WhatsApp Image 2023-03-28 at 19 55 01](https://user-images.githubusercontent.com/82109628/229362398-d2545398-01da-4b4e-8af1-9e4d747c184b.jpg)

## System Design
Following HLD diagram indicates the database build in components
<img width="626" alt="tutoring_HLD" src="https://user-images.githubusercontent.com/82109628/229363095-a1e994c8-d34c-48ee-bef1-052e37526639.png">


## Features

* User and Admin authentication & validation with session uuid having.
* Admin Features:
    * Administrator Role of the entire application
    * Only registered admins with valid session token can add/update/delete driver or customer from main database
    * Admin can access the details of different users, buses and routes.
* Customer Features:
    * Registering themselves with application, and logging in to get the valid session token
    * Viewing list of available Tutors and booking a slot.
    * Only logged in users can update his/her slots, profile updation and other features.
 
 
 ## Contributors
- [@Yenda Vamshi Krishna](https://github.com/Vamshi8464)
- [@Birendra Mahto](https://github.com/bire210)
- [@Ekta Dhawal ](https://github.com/Dekta)
- [@Aniket Babariya](https://github.com/aniketbabariya24)
- [@Jay Shukla](https://github.com/jaysukla)


```
## API Module Endpoints

### User Module

 signup= post request
Api =http://localhost:9090/userRoutes/signup

Deploy = https://odd-teal-caridea-tux.cyclic.app/userRoutes/signup

Details add in body = name,email,password



 Login = post req
Api = http://localhost:9090/userRoutes/login

Deploy = https://odd-teal-caridea-tux.cyclic.app/userRoutes/login

Details add in body  = email, password



Add Teacher Details=>
Api = http://localhost:9090/scheduler/teacher/addDetails

deploy= https://odd-teal-caridea-tux.cyclic.app/scheduler/teacher/addDetails

Details add in body  => address = create div =( three input tag = city,state,pincode)
	qualification = input tag
	Experience =input tag
	Expertise = check box =(different subjects)


Student Add Details 
Api = http://localhost:9090/scheduler/student/addDetails
Deploy = https://odd-teal-caridea-tux.cyclic.app/scheduler/student/addDetails

Details add in body  =>  address = create div =( three input tag = city,state,pincode)
Standard = input tag
Subjects = check box =(different subjects)


Logout =>get request
Api = http://localhost:9090/userRoutes/logout
Deploy = https://odd-teal-caridea-tux.cyclic.app/userRoutes/logout





Forgot Password =>
	post req => body = email
Api = http://localhost:9090/userRoutes/forgotPasword  
 Deploy = https://odd-teal-caridea-tux.cyclic.app/userRoutes/forgotPasword 

	
Verify OTp =post req => body = otp
 	Api= http://localhost:9090/userRoutes/verifyOTP
Deploy = https://odd-teal-caridea-tux.cyclic.app/userRoutes/verifyOTP
 

	
Update password = post => body = password
Api = http://localhost:9090/userRoutes/changePassword
Deploy = https://odd-teal-caridea-tux.cyclic.app/userRoutes/changePassword




Get All Techer Details => 
Api = http://localhost:9090/scheduler/teacher/getAllTeacher
Deploy =https://odd-teal-caridea-tux.cyclic.app/scheduler/teacher/getAllTeacher


Update teacher
 http://localhost:9090/scheduler/teacher/update/TeacherDetails
Deploy = https://odd-teal-caridea-tux.cyclic.app/scheduler/teacher/update/TeacherDetails


Update student
http://localhost:9090/scheduler/student/update/StudentDetails
Deploy =  https://odd-teal-caridea-tux.cyclic.app/scheduler/student/update/StudentDetails


Delete teacher
http://localhost:9090/scheduler/teacher/delete/TeacherDetails
Deploy =https://odd-teal-caridea-tux.cyclic.app/scheduler/teacher/delete/TeacherDetails



Delete student
http://localhost:9090/scheduler/student/delete/StudentDetails
Deploy = =https://odd-teal-caridea-tux.cyclic.app/scheduler/student/delete/StudentDetails





FeedbackRoute 
Feedback Add (post) = > http://localhost:9090/feedback/StudentFeedback     
Deploy =https://odd-teal-caridea-tux.cyclic.app/feedback/StudentFeedback 
  
All Feedback(get) => http://localhost:9090/feedback/allFeedback
Dep = =https://odd-teal-caridea-tux.cyclic.app/feedback/allFeedback




Add Course 
https://odd-teal-caridea-tux.cyclic.app/course/AddCourse

Get all courses
https://odd-teal-caridea-tux.cyclic.app/course/allCourse



All booking
https://odd-teal-caridea-tux.cyclic.app/booking/allBooking


slotBook
https://odd-teal-caridea-tux.cyclic.app/booking/slotBooking


Search teacher with name
https://odd-teal-caridea-tux.cyclic.app/booking/searchTeacher

##Deploy Link
- Netlify -> https://comforting-nougat-70fd30.netlify.app/index.html



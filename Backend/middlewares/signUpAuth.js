// const jwt = require('jsonwebtoken');
// require('dotenv').config()



// const authenticate =async (req,res,next)=>{
//     const SignUpToken = await redis.get('signupToken')
    
//     if(token){     
//         jwt.verify(token,process.env.Token_Pass,function(err,decoded){
//             if(err){
//                 res.status(401).send({"msg":"please login","err":err.message})
//             }
//             else{
//                 if(decoded.isAdmin==true){
//                     req.body.userid = decoded.userid
//                     next()
//                 }
//                 else{
//                     res.send({"msg":"You are not Admin"})
//                 }
                
//             }
//         })
//     }
//     else{
//         res.status(401).send({"msg":"please login correct"})
//     }
// }


// module.exports = {authenticate}
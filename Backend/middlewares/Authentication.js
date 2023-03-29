const jwt = require('jsonwebtoken');
require('dotenv').config()



const authenticate = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token
    //console.log(token)
    if(token){
       
        jwt.verify(token,process.env.Token_Pass,function(err,decoded){
            if(err){
                res.status(401).send({"msg":"please login","err":err.message})
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(401).send({"msg":"please login correct"})
    }
}


module.exports = {authenticate}
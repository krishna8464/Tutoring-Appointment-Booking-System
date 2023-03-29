

const validate=async(req,res,next)=>{
  let {name,mobile,email,password} =req.body;
  mobile=String(mobile)

  if(!name||!mobile||!email||!password){
    res.status(401).send({'msg':"Please fill all details"})
  }else if(mobile.length!=10){
    res.status(401).send({'msg':"Please provide correct mobile number"})
  } else if(password.length<8){
    res.status(401).send({'msg':'Please choose strong password'})
  }
  else{
       next()
  }
}

module.exports={validate}    
let existingdata = [];
async function getData(){
try {
  let res = await fetch("http://localhost:3000/user")
  let out = await res.json();
  existingdata = out
  console.log(out)
} catch (error) {
  console.log("error")
}
}
getData();

let forgotmail = document.getElementById('mail_inbox')

let OTPvalue=0

async function forgot(){
    try {
        let str = forgotmail.value.toLowerCase()
    let status1=str.includes("@gmail.com")
    let status2=false;
    
    existingdata.forEach((item)=>{
        if(item.email===forgotmail.value.toLowerCase()){
          status2=true
          sessionStorage.setItem("userid",item.id)
        }
      })
     
    if(status1===false){
        let data=`
        <br>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        Please Enter Correct <strong>Email!</strong>  
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        document.querySelector('#alert').innerHTML=data
    }else if(status2===false){
        let data=`
        <br>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        No Account Fond With the <strong>Email Id!</strong>  
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        document.querySelector('#alert').innerHTML=data
       }else if(status2){
        OTPvalue = Math.floor((Math.random()*1000000)+1)
        let data = `
        <br>
       <div id="doit"><input id="otpsub" placeholder="Enter OTP" type="number"></div>
       <div id="forgot"><button onclick="otpsub()">Submit OTP</button></div>
       <br>
        <div id="alert"></div>
        `
        document.getElementById('appendotp').innerHTML=data;
         setTimeout(() => {
            alert(OTPvalue)
         }, 2000);
        }
    } catch (error) {
        console.log("some thing went bad in forgot function")
    }
}

let getotp = document.getElementById('otpsub')

async function otpsub(){
    try {
        let getotp = document.getElementById('otpsub')
        if(getotp.value === ""){
            let data=`
        <br>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        Please Fill The <strong>OTP Block!</strong>  
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        document.querySelector('#alert').innerHTML=data
        }
        // console.log(typeof(getotp.value),typeof(OTPvalue))
        if(Number(getotp.value) !== OTPvalue){
            let data=`
            <br>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            wrong OTP <strong>Please Enter correct one!</strong>  
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
            document.querySelector('#alert').innerHTML=data
        }else{
            let data = `
            <div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
          OTP DONE 👍
        </div>
        </div>
            `
            document.querySelector('#alert').innerHTML=data


           setTimeout(() => {
            let data = `
            <br>
           <div id="doit"><input id="otpsub" placeholder="Enter New Password" type="text"></div>
           <div id="forgot"><button onclick="patchotp()">Submit</button></div>
           <br>
            <div id="alert"></div>
            `
            document.getElementById('appendotp').innerHTML=data;
           },1500);
        }

    } catch (error) {
        console.log("some thing went wrong in otpsub")
    }
}



async function patchotp(){
    try {
        let newpass = document.getElementById("otpsub")
        let userid = sessionStorage.getItem('userid')
        let change_pass = await fetch(`http://localhost:3000/user/${userid}`,{
            method:"PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({ password : newpass.value})
        })
        if(change_pass.ok){
            // console.log("all done")
            let data = `
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                Password Changed Sucessfully 👍
                </div>
                </div>
                    `
                document.querySelector('#alert').innerHTML=data
               setTimeout(() => {
                window.location.href="Log_in.html"
               }, 2000);
        }
        
    } catch (error) {
        console.log("some thing went bad in patchotp")
    }
}
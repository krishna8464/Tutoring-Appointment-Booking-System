// const { json } = require("body-parser");

// code for change form start here
const forms = document.querySelector(".forms");
let links = document.querySelectorAll(".link");

// code for change form end here

const form = document.querySelector("#Sform"); // select the form element

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault()
    //preventing form submit
    forms.classList.toggle("show-signup");
  });
});


// Next function

document.querySelector("#Next").addEventListener("click", NEXT);

function NEXT() {
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  const role = form.querySelector("#role").value;

  addDetails(name, email, password);

  if (role == "teacher") {
    document.querySelector("#Tf").style.display = "block";
    document.querySelector("#nf").style.display = "none";
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  } else if (role == "student") {
    document.querySelector("#Sf").style.display = "block";
    document.querySelector("#nf").style.display = "none";
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  }
}

async function addDetails(name, email, password) {

  if(name.length==0 || email.length ==0 || password.length==0){
    alert("fill all details")
    return 
  }

  const url = "https://odd-teal-caridea-tux.cyclic.app/userRoutes/signup";

  const data = {
    name: name,
    email: email,
    password: password
  };

  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const response = await res.json();
  console.log(response);
}

// login function
const Loginbutton = document.querySelector("#login");
const Lform = document.querySelector("#Lform");

Loginbutton.addEventListener("click", async () => {
  const email = Lform.querySelector('input[type="email"]').value;
  const password = Lform.querySelector('input[type="password"]').value;

  const url = "https://odd-teal-caridea-tux.cyclic.app/userRoutes/login";

  const data = {
    email: email,
    password: password
  };
  console.log(data)

  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const response = await res.json();
  sessionStorage.setItem("Userdetials",JSON.stringify(response));
  sessionStorage.setItem("status", true)

  if(response.msg === "Login successfull"){
      window.location.href = "index.html"
  }
  else{
    alert(response.msg)
  }
  // console.log(response);
});



// Submit function for teacher

var Tform = document.getElementById("TeacherDetails");

Tform.addEventListener("submit", async function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  //   Get the values of the input fields
 let phoneNumber = Tform.querySelector("#Mobile").value;
 let gender = Tform.querySelector("#tgen").value;
 let qualification = Tform.querySelector("#Qualification").value;
 let experience = Tform.querySelector("#Experience").value;
 let city = Tform.querySelector("#tcity").value;
 let state = Tform.querySelector("#tstate").value;
 let pincode = Tform.querySelector("#tpin").value;

 
  

 
 let tex1 = Tform.querySelector("#tex1");
 let tex2 = Tform.querySelector("#tex2");
 let tex3 = Tform.querySelector("#tex3");
 let tex4 = Tform.querySelector("#tex4");
 let tex5 = Tform.querySelector("#tex5");


let val =[]
 if(tex1.checked === true){
    val.push(tex1.value)
 }
 if(tex2.checked === true){
  val.push(tex2.value)
}
if(tex3.checked === true){
  val.push(tex3.value)
}
if(tex4.checked === true){
  val.push(tex4.value)
}
if(tex5.checked === true){
  val.push(tex5.value)
}




let  expertise = val

  let address = {
    city,
    state,
    pincode
  };

  let data = {
    mobile:phoneNumber,
    gender: gender,
    qualification:qualification,
    experience: experience,
    address: address,
    expertise: expertise
  };
  console.log(data)

  let td="https://odd-teal-caridea-tux.cyclic.app/scheduler/teacher/addDetails"

  let res = await fetch(td,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   })
   const response = await res.json();
   console.log(response);
   if(response.msg === "details added"){
      window.location.href = "signup.html"
  }
  else{
    alert(response.msg)
  }
    
});





// submit function for student

var Sform = document.getElementById("StudentDetails");

Sform.addEventListener("submit", async function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  //   Get the values of the input fields
 let city = Sform.querySelector("#tcity1").value;
 let state = Sform.querySelector("#tstate1").value;
 let pincode = Sform.querySelector("#tpin1").value;
 let phoneNumber =Sform.querySelector('#Mobile1').value;
 let gender = Sform.querySelector("#tgen1").value;
 let standard = Sform.querySelector("#standard").value

 let tex11 = Sform.querySelector("#tex11");
 let tex22 = Sform.querySelector("#tex22");
 let tex33 = Sform.querySelector("#tex33");
 let tex44 = Sform.querySelector("#tex44");
 let tex55 = Sform.querySelector("#tex55");


 let val =[]
 if(tex11.checked === true){
    val.push(tex11.value)
 }
 if(tex22.checked === true){
  val.push(tex22.value)
}
if(tex33.checked === true){
  val.push(tex33.value)
}
if(tex44.checked === true){
  val.push(tex44.value)
}
if(tex55.checked === true){
  val.push(tex55.value)
}

let  subjects = val
console.log(val)
  let address = {
    city,
    state,
    pincode
  };

  let data = {
    mobile:phoneNumber,
    gender: gender,
    standard:standard,
    subjects: subjects,
    address: address
  };

  console.log(data)
  const sd="https://odd-teal-caridea-tux.cyclic.app/scheduler/student/addDetails"

  console.log(data)
  let res = await fetch(sd,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   })
   const response = await res.json();
   console.log(response);

   if(response.msg === "details added"){
      window.location.href = "signup.html"
    }
    else{
      alert(response.msg)
    }

});


// let authe = document.getElementById("google")

// authe.onclick=async()=>{
//   console.log("hi")
//   let res = await fetch("http://localhost:9090/auth/google",{
//     method:"GET"
//   })

//   let response = await res.json()
//   console.log(response)
//   if(response.msg==="Login succesfull"){
//     window.location.href = "index.html"
//   }
// }




// code for change form start here
const forms = document.querySelector(".forms");
let links = document.querySelectorAll(".link");

// code for change form end here

const form = document.querySelector("#Sform"); // select the form element
const Lform = document.querySelector("#Lform");

const Loginbutton = document.querySelector("#login");

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

  const url = "http://localhost:9090/userRoutes/signup";

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

Loginbutton.addEventListener("click", async () => {
  const email = Lform.querySelector('input[type="email"]').value;
  const password = Lform.querySelector('input[type="password"]').value;

  const url = "http://localhost:9090/userRoutes/login";

  const data = {
    email: email,
    password: password
  };

  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const response = await res.json();
  if(response.msg === "Login successfull"){
    window.location.href = "index.html"
  }
  else{
    alert(response.msg)
  }
 
  console.log(response);
});



// Submit function for teacher

var Tform = document.getElementById("TeacherDetails");

Tform.addEventListener("submit", async function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  //   Get the values of the input fields
  var phoneNumber = Tform.querySelector("#Mobile").value;
  var gender = Tform.querySelector("#tgen").value;
  var qualification = Tform.querySelector("#Qualification").value;
  var experience = Tform.querySelector("#Experience").value;
  var city = Tform.querySelector("#tcity").value;
  var state = Tform.querySelector("#tstate").value;
  var pincode = Tform.querySelector("#tpin").value;
 

 
  var tex1 = Tform.querySelector("#tex1").value;
  var tex2 = Tform.querySelector("#tex2").value;
  var tex3 = Tform.querySelector("#tex3").value;
  var tex4 = Tform.querySelector("#tex4").value;
  var tex5 = Tform.querySelector("#tex5").value;
  var  experties = [tex1,tex2,tex3,tex4,tex5]

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
    experties: experties
  };
  console.log(data)

  let td="http://localhost:9090/scheduler/teacher/addDetails"

  let res = await fetch(td,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   })
   const response = await res.json();
   console.log(response);
});





// submit function for student

var Sform = document.getElementById("StudentDetails");

Sform.addEventListener("submit", async function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  //   Get the values of the input fields
  var city = Sform.querySelector("#tcity1").value;
  var state = Sform.querySelector("#tstate1").value;
  var pincode = Sform.querySelector("#tpin1").value;
  var phoneNumber =Sform.querySelector('#Mobile1').value;
  var gender = Sform.querySelector("#tgen1").value;
  var standard = Sform.querySelector("#standard").value

  var tex1 = Sform.querySelector("#tex11").value;
  var tex2 = Sform.querySelector("#tex22").value;
  var tex3 = Sform.querySelector("#tex33").value;
  var tex4 = Sform.querySelector("#tex44").value;
  var tex5 = Sform.querySelector("#tex55").value;

  var  subjects = [tex1,tex2,tex3,tex4,tex5]

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

  const sd="http://localhost:9090/scheduler/student/addDetails"

  console.log(data)
  let res = await fetch(sd,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   })
   const response = await res.json();
   console.log(response);

});



links.forEach((link) => {
  link.addEventListener("click", () => {
    //preventing form submit
    forms.classList.toggle("show-signup");
  });
});

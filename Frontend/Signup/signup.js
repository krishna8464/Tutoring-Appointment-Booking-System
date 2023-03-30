
// code for change form start here 
const forms = document.querySelector(".forms")
let links = document.querySelectorAll(".link");



// code for change form end here 



const form = document.querySelector('#Sform'); // select the form element
const Lform = document.querySelector('#Lform');

const signupButton = document.querySelector('#signup'); // select the signup button

const Loginbutton = document.querySelector("#login");


// Next function 

document.querySelector("#Next").addEventListener("click",NEXT)

function NEXT(){
    const email = form.querySelector('input[type="email"]').value; 
    const password = form.querySelector('input[type="password"]').value; 
    const role = form.querySelector('#role').value; 

    if(role=="teacher"){
        document.querySelector("#Tf").style.display="block"
        document.querySelector("#nf").style.display="none"
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    }
    else if (role=="student"){
        document.querySelector("#Sf").style.display="block"
        document.querySelector("#nf").style.display="none"
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

    }





}




// Signup function 

signupButton.addEventListener('click', () => {
    const email = form.querySelector('input[type="email"]').value; 
    const password = form.querySelector('input[type="password"]').value; 
    const role = form.querySelector('#role').value; 


console.log(email,password,role)


    
   
});


// login function 

Loginbutton.addEventListener('click',async()=>{
    const email = Lform.querySelector('input[type="email"]').value; 
    const password = Lform.querySelector('input[type="password"]').value; 
   
    const url ="http://localhost:9090/userRoutes/login"

    const data = {
        
       "email":email ,
      "password":password

      };

    let res = await fetch(url,{
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
     })
     const response = await res.json();
     console.log(response);
    
// console.log(1)

})

// Submit function for teacher

var Tform = document.getElementById("TeacherDetails");


Tform.addEventListener("submit", async function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

//   Get the values of the input fields
  var fullName = Tform.querySelector('#tname').value;
  var qualification = Tform.querySelector('#tquali').value;
  var city = Tform.querySelector('#tcity').value;
  var state = Tform.querySelector('#tstate').value;
  var pincode =Tform.querySelector('#tpin').value;
//   var phoneNumber =Tform.querySelector('#tnum').value;
  var experties = Tform.querySelector('#tex').value;
   experties=experties.split(",")
  var gender = Tform.querySelector('#tgen').value;
  var experience = Tform.querySelector("#exp").value
var email=localStorage.getItem("email");
var password=localStorage.getItem("password");
localStorage.setItem("email", '');
localStorage.setItem("password",'');
  let address={
    city,
    state,
    pincode
  }


  let data ={
name:fullName,
email:email,
password:password,
gender:gender,
experience:experience,
address:address,
experties:experties

  }

// const url="http://localhost:9090/userRoutes/signup"

console.log(data)
// let res = await fetch(url,{
//     method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(data)
//  })
//  const response = await res.json();
//  console.log(response);


  



});

// submit function for teacher





// submit function for student 

var Sform = document.getElementById("StudentDetails");

Sform.addEventListener("submit",async function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();
  
  //   Get the values of the input fields
    var fullName = Sform.querySelector('#sname').value;
   
   
    var city = Sform.querySelector('#scity').value;
    var state = Sform.querySelector('#sstate').value;
    var pincode =Sform.querySelector('#spin').value;
  //   var phoneNumber =Tform.querySelector('#tnum').value;
    var subjects = Sform.querySelector('#subs').value;
     subjects=subjects.split(",")
    var gender = Sform.querySelector('#sgen').value;
  
  var email=localStorage.getItem("email");
  var password=localStorage.getItem("password");
  localStorage.setItem("email", '');
  localStorage.setItem("password",'');
    let address={
      city,
      state,
      pincode
    }
  
  
    let data ={
  name:fullName,
  email:email,
  password:password,
  gender:gender,
  subjects:subjects,
  address:address
  
  
    }
  
    // const url="http://localhost:9090/scheduler/teacher/addDetails"

    // // console.log(data)
    // let res = await fetch(url,{
    //     method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    //  })
    //  const response = await res.json();
    //  console.log(response);
    
  console.log(data)
  
  
  });



// submit function for student 

links.forEach(link => {
    link.addEventListener("click", () => {
    //preventing form submit
     forms.classList.toggle("show-signup");
    
    })
    })
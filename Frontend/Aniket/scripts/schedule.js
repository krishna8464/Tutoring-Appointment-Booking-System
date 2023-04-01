const url = `http://localhost:9090/scheduler/teacher/getAllTeacher`;

const getData = async () => {
  let response = await fetch(url);
  let data = await response.json();
  findTecher(data);
  console.log(data);
};



function findTecher(data){
  let tutorHeading= document.getElementById("tutor-heading").innerText;
  for(let i=0;i<=data.length-1;i++){
    if(data[i].teacherDetail.name==tutorHeading){
     localStorage.setItem("tutor", JSON.stringify(data[i]));
      break;
      }else{
        console.log("No")
      }
  }
}

const getStarted= document.getElementById("get-started");

getStarted.onclick=()=>{
  getData();
}

const tutor= JSON.parse(localStorage.getItem("tutor"));

// const url= "https://gray-tired-gharial.cyclic.app/"



let slot1= document.getElementById("slot1");
let slot2= document.getElementById("slot2");
let slot3= document.getElementById("slot3");
let slot4= document.getElementById("slot4");

slot1.onclick=()=>{
  slot1Book();
}
slot2.onclick=()=>{
  slot2Book();
}
slot3.onclick=()=>{
  slot3Book();
}
slot4.onclick=()=>{
  slot4Book();
}

let mySlot;

function slot1(){
  mySlot="slot 1";
}
function slot2(){
  mySlot="slot 2";
}
function slot3(){
  mySlot="slot 3";
}
function slot4(){
  mySlot="slot 4";
}


const signupBtn= document.getElementById('payBTN');

const payUser= async()=>{
    const fname= document.getElementById('fName').value;
    const lname= document.getElementById('lName').value;
    const email= document.getElementById('email').value;
    const mobile= document.getElementById('mbl').value;
    
    localStorage.setItem("lfirstName", JSON.stringify(fname))

    const user={fname,lname,email,mobile,password, mySlot}

    try {
        const res= await fetch("https://localhost",{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-type': "application/json"
            }
        });
       
        console.log("Register Succesfully");
      window.location.href= 'login.html'
        
    } catch (error) {
        console.log("Error while Register");
        console.log(error);
    }
}

signupBtn.onclick=()=>{
payUser();
}
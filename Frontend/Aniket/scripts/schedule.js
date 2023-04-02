

const tutor = JSON.parse(localStorage.getItem("tutor"));

// const url= "https://gray-tired-gharial.cyclic.app/"
const Teacher_Booking_id = tutor.Teacher_Booking_id

let myslot = "";
let slot1 = document.getElementById("slot1");
let slot2 = document.getElementById("slot2");
let slot3 = document.getElementById("slot3");
let slot4 = document.getElementById("slot4");

if (slot1.checked === true) {
  myslot = slot1.value;
}
if (slot2.checked === true) {
  myslot = slot2.value;
}
if (slot3.checked === true) {
  myslot = slot3.value;
}
if (slot4.checked === true) {
  myslot = slot4.value;
}



const signupBtn = document.getElementById("submit");

signupBtn.addEventListener("submit", async function(event){
  event.preventDefault();
  console.log("hi")
  const StudentName = document.getElementById("fName").value;
  const courseName = document.getElementById("lName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("mbl").value;

  let slot = "";
  let slot1 = document.getElementById("slot1");
  let slot2 = document.getElementById("slot2");
  let slot3 = document.getElementById("slot3");
  let slot4 = document.getElementById("slot4");

  if (slot1.checked === true) {
    slot = slot1.value;
  }
  if (slot2.checked === true) {
    slot = slot2.value;
  }
  if (slot3.checked === true) {
    slot = slot3.value;
  }
  if (slot4.checked === true) {
    slot = slot4.value;
  }

  const user = { StudentName, email, phone, courseName,Teacher_Booking_id ,slot};
  console.log(user)
  const res = await fetch("http://localhost:9090/booking/slotBooking", {
      method: "POST",
      headers: {
        "Content-type": "application/json"},
      body: JSON.stringify(user)
  })

  const response = await res.json();
  console.log(response);

})






   


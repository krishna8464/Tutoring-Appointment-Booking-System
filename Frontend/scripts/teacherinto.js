let access = sessionStorage.getItem("status");
console.log(access);
let append = document.getElementById("appendprofile");
let getstarted = document.getElementById("login");
let userdetials = JSON.parse(sessionStorage.getItem("Userdetials"));
console.log(userdetials);
let avatar = userdetials.userdet.avatar;
console.log(avatar);

// appendprofile

if (access === "true") {
  getstarted.style.display = "none";
  let data = `
    <div>
    <div class="nav-link" id="collaborate" href="#">
    <a href="profile.html"><img style="width: 30px;height: 30px;" src=${avatar} /></a>
    </div>
    </div>
    `;
  append.innerHTML = data;
}

// don't touch the above code

let URL = window.location.href.split("/");
const finalUrl = URL.slice(8);
let url_set = document.querySelector("#url-set");
let res_set = "";

url_set.innerText = res_set;
//   for sliding
const tabs = document.querySelectorAll("[data-tab-value]");
const tabInfos = document.querySelectorAll("[data-tab-info]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabValue);

    tabInfos.forEach((tabInfo) => {
      tabInfo.classList.remove("active");
    });
    target.classList.add("active");
  });
});

let teacherDeta = JSON.parse(sessionStorage.getItem("teacherdet"));
console.log(teacherDeta);
let tutor_name = document.querySelector("#tutor-heading");
tutor_name.innerText = teacherDeta.teacherDetail.name;

let tutorimage = document.querySelector("#tutor_image");

tutorimage.src = `${teacherDeta.image}`;

document.querySelector("#set-eductaion").innerText=`${teacherDeta.qualification}, Exprience : ( ${teacherDeta.experience} years)`
const exp = teacherDeta.expertise;

document.querySelector("#set-expertise").innerText = exp.join(",");
document.querySelector("#name").innerText = teacherDeta.teacherDetail.name;

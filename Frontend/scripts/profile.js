let access = sessionStorage.getItem("status")
console.log(access)
let append = document.getElementById("appendprofile")
let getstarted = document.getElementById("login");
let userdetials = JSON.parse(sessionStorage.getItem("Userdetials"))
console.log(userdetials)
let avatar = userdetials.userdet.avatar
console.log(avatar)

// appendprofile

if(access === "true"){
    getstarted.style.display = 'none';
    let data = `
    <div>
    <div class="nav-link" id="collaborate" href="#">
    <a href="profile.html"><img style="width: 30px;height: 30px;" src=${avatar} /></a>
    </div>
    </div>
    `
    append.innerHTML=data  
}

// don't touch the above code





let user = JSON.parse(sessionStorage.getItem("Userdetials"));
console.log(user)

let address=user.extdet.address

// 

document.querySelector("#profileimg").src=user.userdet.avatar;

if(user.userdet.isAdmin==false){

document.querySelector("#usertype").innerText=user.username
}else{
    document.querySelector("#usertype").innerText="Admin"
}

document.querySelector("#uname").innerText=user.username;
document.querySelector("#email").innerText=user.userEmail;

document.querySelector("#sub").innerText=user.extdet.expertise.join(",")
document.querySelector("#mobile").innerText=user.extdet.mobile;
document.querySelector("#add").innerText=user.extdet.address.city;

let logoutbtn=document.querySelector("#logoutbtn");
logoutbtn.addEventListener("click",(e)=>{
e.preventDefault();

sessionStorage.setItem("Userdetials","");
window.location.href="index.html"
})
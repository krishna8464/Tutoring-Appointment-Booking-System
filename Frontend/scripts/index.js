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


function teacher(){
    window.location.href="teachers.html"
}


let searchtext = document.getElementById("searchtext");

function search(event){
    event.preventDefault();
    console.log(searchtext.value)
}
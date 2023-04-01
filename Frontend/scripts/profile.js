let user = JSON.parse( sessionStorage.getItem("Userdetials"));
console.log(user.extdet)

let address=user.extdet[0].address

let subjects=user.extdet[0].subjects

console.log(subjects)

document.querySelector("#profileimg").src=user.userdet.avatar;

if(user.userdet.isAdmin==false){

document.querySelector("#usertype").innerText="User"
}else{
    document.querySelector("#usertype").innerText="Admin"
}

document.querySelector("#uname").innerText=user.username;

document.querySelector("#sub").innerText=subjects.join(",")



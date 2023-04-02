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





const url = `https://odd-teal-caridea-tux.cyclic.app/scheduler/teacher/getAllTeacher`;

const getData = async () => {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  appends(data);
  // console.log(data);
};

let mainDiv = document.getElementById("packageDiv");
getData();


let teacherimg = [
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUfqHdhuSIT7DB4JJQhQh7Mqy6X7utDwJVg&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPrWgEPelbkU45oMSxEwG7zxur998_CBugiA&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVWT916ZIZzh7ZTuRB9cq3yVWptueIy-eKYw&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPdZ109anNDpC4xoF1szpMXH4kT_e7slmt2g&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqPOLh5Wv53hzcowE8kZuntq-UvVQkONXBA&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsJJ6y7jSi0ATS9DgFA7tKuE_z-jjbeRDOg&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS2shX9MQDthZOWx413loOr8wS9Nh8KOusIw&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lmf4zJaWEKRDy-vn4hZ4GxQQxDvRqQpqOMIFxXnkarsGy8GyUsSPiOCDrCn4NzFe2p4&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJlDmjWYnYKMLFRDftE9jo9G9KHEBnb3PWddQ844CQXZ3E6Sl_YFJINYXdWLacisym_Q&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk49MLNrUb_XUatI0kKeBCJYdUuDzu3_YLpA&usqp=CAU"
]


let ind = 0;
const appends = (data,i) => {
  mainDiv.innerHTML = null;
  data.forEach((el,index) => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    let bigDiv = document.createElement("div");
    bigDiv.className = "bigDiv";
    let imgDiv = document.createElement("div");
    imgDiv.className = "imgDiv";
    



    let title = document.createElement("h4");
    title.innerText = el.teacherDetail.name;

    let priceDiv = document.createElement("div");
    priceDiv.className = "price";

    let education = document.createElement("p");
    education.innerHTML = "<b>EDUCATION:</b>" + " " + el.qualification;
    let sub = document.createElement("p");
    sub.innerHTML = "<b>SUBJECTS:</b>" + " " + el.expertise.join(" ");
  
    priceDiv.append(education,sub)

    let detailsDiv = document.createElement("div");
    detailsDiv.className = "setitright"
    let addBtn = document.createElement("button");
    addBtn.className = "addBtn";
    addBtn.addEventListener("click",()=>{
      el.image=teacherimg[index];
      sessionStorage.setItem("teacherdet",JSON.stringify(el));
      window.location.href="teacherinfo.html"
    })
    addBtn.innerText = "Book Now";
    
    

    detailsDiv.append(addBtn);

    let image1 = document.createElement("img");
    image1.src = teacherimg[ind];
    

    imgDiv.append(image1);

    bigDiv.append(title, priceDiv, detailsDiv);
    cardDiv.append(imgDiv, bigDiv);
    mainDiv.append(cardDiv);
    if(ind===9){
      ind=-1
    }
    ind++
    
  });
};



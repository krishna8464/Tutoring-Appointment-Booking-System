const url = `http://localhost:9090/scheduler/teacher/getAllTeacher`;

const getData = async () => {
  let response = await fetch(url);
  let data = await response.json();
  append(data);
  // console.log(data);
};

let mainDiv = document.getElementById("packageDiv");
getData();


const append = (data) => {
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
    let addBtn = document.createElement("button");
    addBtn.className = "addBtn";
    addBtn.innerText = "Book Now";
    
    

    detailsDiv.append(addBtn);

    let image1 = document.createElement("img");
    image1.src = el.image;
    

    imgDiv.append(image1);

    bigDiv.append(title, priceDiv, detailsDiv);
    cardDiv.append(imgDiv, bigDiv);
    mainDiv.append(cardDiv);
  });
};



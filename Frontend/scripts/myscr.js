const url = `http://localhost:9090/scheduler/teacher/getAllTeacher`;

const getData = async () => {
  let response = await fetch(url);
  let data = await response.json();
  findTecher(data);
  console.log(data);
};

function findTecher(data) {
  let tutorHeading = document.getElementById("tutor-heading").innerText;
  for (let i = 0; i <= data.length - 1; i++) {
    if (data[i].teacherDetail.name == tutorHeading) {
      localStorage.setItem("tutor", JSON.stringify(data[i]));
      break;
    } else {
      console.log("No");
    }
  }
}

const getStarted = document.getElementById("get-started");

getStarted.onclick = async() => {
  getData();
  window.location.href="schedule.html"
};
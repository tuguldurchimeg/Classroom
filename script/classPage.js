import ClassSec from "./ClassRender.js";

const profileBtn = document.getElementById("profile-btn");
const userPopUp = document.getElementById("user-popup");

profileBtn.addEventListener("click", () => {
  if (userPopUp.classList.contains("open")) userPopUp.classList.remove("open");
  else userPopUp.classList.add("open");
});

const addRatingBtn = document.getElementById("add-rating-btn");
const ratingPopUP = document.getElementById("rating-pop-up");

addRatingBtn.addEventListener("click", () => {
  if (ratingPopUP.classList.contains("open"))
    ratingPopUP.classList.remove("open");
  else ratingPopUP.classList.add("open");
});

// const timeBtn = document.getElementsByClassName("timeBtn");
// timeBtn.addEventListener("click", () => {
//   if (timeBtn.classList.contains("timeBtnClick"))
//     timeBtn.classList.remove("timeBtnClick");
//   else timeBtn.classList.add("timeBtnClick");
// });

const usp = new URLSearchParams(document.location.search);
const classObj = JSON.parse(usp.get("id"));
console.log(classObj);

let classTitleHTML = "";
let mainInfoHTML = "";

classTitleHTML += `
    <h2 class="heading-3">
      <span class="room">${classObj.building} - ${classObj.roomNo}</span>
    <h2>
    <img src="styles/assets/class.jpg" alt="class image" class="class-img">
  `;

mainInfoHTML += `
    <li><span class="main-type">${classObj.type}</span></li>
    <li><div class="vl"></div></li>
    <li>
        <div class="info-desc">Суудлын тоо</div>
        <div class="seat-count-m heading-6">${classObj.capacity}</div>
    </li>
    <li><div class="vl"></div></li>
    <li>
        <div class="info-desc" id="projector-info">Проектор</div>
        ${
          classObj.projector === "Проектортой"
            ? "<i class='fa-solid fa-check proj-state'></i>"
            : "<i class='fa-solid fa-xmark proj-state'></i>"
        }
    </li>
  `;

document.getElementById("main-title").innerHTML = classTitleHTML;
document.getElementById("main-desc").innerHTML = mainInfoHTML;

// fetch similar classes
// fetch("https://api.npoint.io/70107af397f4a981c076")
//   .then((response) => response.json())
//   .then((responseObj) => {
//     let tempDepart, tempType;
//     if (classObj.building == "E-lib") tempDepart = "Е-Номын сан";
//     else if (classObj.building == "1") tempDepart = "Хичээлийн төв байр";
//     else if (classObj.building == "Хууль")
//       tempDepart = "Улаанбаатар сургуулийн хичээлийн байр";
//     else tempDepart = "Хичээлийн байр " + classObj.building;

//     if (classObj.type == "Семинар") tempType = "Семинарын танхим";
//     else if (classObj.type == "Лекц") tempType = "Лекцийн танхим";
//     else if (classObj.type == "Лаб") tempType = "Сургалтын лаборатори";

//     let filteredClasses = responseObj.filter(
//       (similarClass) =>
//         similarClass.Хичээлийн_байр == tempDepart &&
//         similarClass.Өрөөний_зориулалт == tempType &&
//         similarClass.Хичээлийн_хуваарь_тавих_боломж != "Хуваарь тавих боломжгүй"
//     );

//     const simClassHTMLArray = filteredClasses.map((simClassObj) => {
//       const classI = new ClassSec(simClassObj);
//       return classI.Render();
//     });

//     const simClassHTML = simClassHTMLArray.reduce(
//       (prev, current) => prev + current
//     );
//     document.getElementById("s-class-list").innerHTML = simClassHTML;
//   });

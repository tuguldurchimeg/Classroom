import ClassRen from "./classRender.js";

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

let timeButtons = {};
const timeBtns = document.getElementsByClassName("timeBtn");
for (let i = 0; i < timeBtns.length; i++) {
  timeBtns[i].addEventListener("click", () => {
    if (timeBtns[i].classList.contains("timeBtnClick"))
      timeBtns[i].classList.remove("timeBtnClick");
    else timeBtns[i].classList.add("timeBtnClick");
  });
}

const usp = new URLSearchParams(document.location.search);
const classObj = JSON.parse(usp.get("id"));
console.log(classObj);

let classTitleHTML = "";
let mainInfoHTML = "";

classTitleHTML += `
    <h2 class="heading-3 title">
      <span class="room">${classObj.build} - ${classObj.roomNo}</span>
    <h2>
    <img src="styles/assets/class.jpg" alt="class image" class="class-img">
  `;

mainInfoHTML += `
    <li><span class="info-type">${classObj.type}</span></li>
      <li><div class="vl"></div></li>
    <li>
        <div class="info-desc">Суудлын тоо</div>
        <div class="info-attr heading-6 " id="seat-count-m">${
          classObj.capac
        }</div>
    </li>
      <li><div class="vl"></div></li>
    <li>
        <div class="info-desc">Проектор</div>
        ${
          classObj.proj === "Проектортой"
            ? "<i class='fa-solid fa-check info-attr' id='proj-state'></i>"
            : "<i class='fa-solid fa-xmark info-attr' id='proj-state'></i>"
        }
    </li>
  `;

document.getElementById("main-title").innerHTML = classTitleHTML;
document.getElementById("main-desc").innerHTML = mainInfoHTML;

// fetch similar classes
fetch("https://api.npoint.io/70107af397f4a981c076")
  .then((response) => response.json())
  .then((responseObj) => {
    let tempDepart, tempType;
    if (classObj.build == "E-lib") tempDepart = "Е-Номын сан";
    else if (classObj.build == "1") tempDepart = "Хичээлийн төв байр";
    else if (classObj.build == "Хууль")
      tempDepart = "Улаанбаатар сургуулийн хичээлийн байр";
    else tempDepart = "Хичээлийн байр " + classObj.build;

    if (classObj.type == "Семинар") tempType = "Семинарын танхим";
    else if (classObj.type == "Лекц") tempType = "Лекцийн танхим";
    else if (classObj.type == "Лаб") tempType = "Сургалтын лаборатори";

    let filteredClasses = responseObj.filter(
      (similarClass) =>
        similarClass.Өрөөний_хувийн_дугаар != classObj.roomID &&
        similarClass.Хичээлийн_байр == tempDepart &&
        similarClass.Өрөөний_зориулалт == tempType &&
        similarClass.Хичээлийн_хуваарь_тавих_боломж != "Хуваарь тавих боломжгүй"
    );

    const simClassHTMLArray = filteredClasses.map((simClassObj) => {
      const classI = new ClassRen(simClassObj, "");
      return classI.Render();
    });

    const simClassHTML = simClassHTMLArray.reduce(
      (prev, current) => prev + current
    );
    document.getElementById("s-class-list").innerHTML = simClassHTML;
  });

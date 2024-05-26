import ClassRen from "./ClassRender.js";

const addRatingBtn = document.getElementById("add-rating-btn");
const ratingPopUP = document.getElementById("rating-pop-up");
const closePopUp = document.getElementById("close-rating");

addRatingBtn.addEventListener("click", () => {
  ratingPopUP.classList.add("open");
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
let ratingHTML = "";
let ratingData;

classTitleHTML += `
    <h2 class="heading-3 title">
      <span class="room">${classObj.build} - ${classObj.roomNo}
        <btn-like roomId=${classObj.roomID} id="btn-like"></btn-like>
      </span>
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
          classObj.proj
            ? "<i class='fa-solid fa-check info-attr' id='proj-state'></i>"
            : "<i class='fa-solid fa-xmark info-attr' id='proj-state'></i>"
        }
    </li>
  `;
try {
  const response = await fetch(
    `http://localhost:3000/rating/${classObj.roomID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("ratings retrieved successfully.");
    ratingData = await response.json();
  } else {
    console.error("Failed to retrieve rating. HTTP status:", response.status);
  }
} catch (error) {
  console.error("Error retrieving rating:", error);
}
if (ratingData == null) {
  ratingData.air = 0;
  ratingData.comfort = 0;
  ratingData.wifi = 0;
  ratingData.slot = 0;
}
ratingHTML = `
    <h6>
      <div class="main-rate">${
        (ratingData.air +
          ratingData.comfort +
          ratingData.wifi +
          ratingData.slot) /
        4
      }</div>
    </h6>
    <nav class="rate-criteria">
      <meter min="0" max="5" value="${ratingData.air}" id="air-meter">
      </meter>
      <meter min="0" max="5" value="${ratingData.comfort}" id="comfort-meter">
      </meter>
      <meter min="0" max="5" value="${ratingData.wifi}" id="wifi-meter">
      </meter>
      <meter min="0" max="5" value="${ratingData.slot}" id="socket-meter">
      </meter>
    </nav>
    <button id="add-rating-btn">
      <div><i class="fa-solid fa-plus"></i></div>
    </button>
  `;

document.getElementById("main-title").innerHTML = classTitleHTML;
document.getElementById("main-desc").innerHTML = mainInfoHTML;
// document.querySelector(".rating").innerHTML = ratingHTML;

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

import ClassFormatter from "./ClassFormatter.js";
import ClassRen from "./ClassRender.js";

const usp = new URLSearchParams(document.location.search);
const classObj = JSON.parse(usp.get("id"));
console.log(classObj);

let classTitleHTML = "";
let mainInfoHTML = "";
let ratingHTML = "";

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

// fetch class's rating data
let ratingData;
try {
  const response = await fetch(
    `http://localhost:3000/rating/${classObj.roomID}`
  );

  if (response.ok) {
    ratingData = await response.json();
  } else {
    console.error("Failed to retrieve rating. HTTP status:", response.status);
  }
} catch (error) {
  console.error("Error retrieving rating:", error);
}

ratingHTML = `
    <h6>
      <div class="main-rate">${ratingData.avgRate}
      </div>
    </h6>
    <nav class="rate-criteria">
      <meter min="0" max="5" value="${ratingData.rows[0].air}" id="air-meter">
      </meter>
      <meter min="0" max="5" value="${ratingData.rows[0].comfort}" id="comfort-meter">
      </meter>
      <meter min="0" max="5" value="${ratingData.rows[0].wifi}" id="wifi-meter">
      </meter>
      <meter min="0" max="5" value="${ratingData.rows[0].slot}" id="socket-meter">
      </meter>
    </nav>
    <button id="add-rating-btn">
      <div><i class="fa-solid fa-plus"></i></div>
    </button>
  `;

document.getElementById("main-title").innerHTML = classTitleHTML;
document.getElementById("main-desc").innerHTML = mainInfoHTML;
document.querySelector(".rating").innerHTML = ratingHTML;

// rating event listener
const addRatingBtn = document.getElementById("add-rating-btn");
const ratingPopUP = document.getElementById("rating-pop-up");

addRatingBtn.addEventListener("click", () => {
  ratingPopUP.classList.add("open");
});

// fetch similar classes from db
let formatter = new ClassFormatter();
const building = formatter.reformatBuilding(classObj.build);
const simClassResponse = await fetch(
  `http://localhost:3000/classes/${encodeURIComponent(
    classObj.roomID
  )}/${encodeURIComponent(building)}`
);
if (!simClassResponse.ok) {
  throw new Error("Network response was not ok");
}
const simClassData = await simClassResponse.json();
let simClassHTML = simClassData.data.map((classObj) => {
  const classInstance = new ClassRen(classObj);
  return classInstance.Render();
});
document.getElementById("s-class-list").innerHTML = simClassHTML;

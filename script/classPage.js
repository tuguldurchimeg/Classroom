import ClassRen from "./ClassRender.js";
import TimeBtn from "./TimeBtnRender.js";

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
    `http://localhost:3000/rating/${classObj.roomID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    ratingData = await response.json();
  } else {
    console.error("Failed to retrieve rating. HTTP status:", response.status);
  }
} catch (error) {
  console.error("Error retrieving rating:", error);
}

const data = ratingData[0];
let air = parseFloat(data.air) || 0,
  comfort = parseFloat(data.comfort) || 0,
  wifi = parseFloat(data.wifi) || 0,
  slot = parseFloat(data.slot) || 0;

ratingHTML = `
    <h6>
      <div class="main-rate">${((air + comfort + wifi + slot) / 4).toFixed(1)}
      </div>
    </h6>
    <nav class="rate-criteria">
      <meter min="0" max="5" value="${air}" id="air-meter">
      </meter>
      <meter min="0" max="5" value="${comfort}" id="comfort-meter">
      </meter>
      <meter min="0" max="5" value="${wifi}" id="wifi-meter">
      </meter>
      <meter min="0" max="5" value="${slot}" id="socket-meter">
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
let tempBuild, tempType;
if (classObj.build == "E-lib") tempBuild = "Е-Номын сан";
else if (classObj.build == "1") tempBuild = "Хичээлийн төв байр";
else if (classObj.build == "Хууль")
  tempBuild = "Улаанбаатар сургуулийн хичээлийн байр";
else tempBuild = "Хичээлийн байр " + classObj.build;

if (classObj.type == "Семинар") tempType = "Хичээлийн танхим";
else if (classObj.type == "Лекц") tempType = "Лекцийн танхим";
else if (classObj.type == "Лаб") tempType = "Сургалтын лаборатори";

const simClassResponse = await fetch(
  `http://localhost:3000/classes/${encodeURIComponent(
    classObj.roomID
  )}/${encodeURIComponent(tempBuild)}`
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

// Get month day ( Get slot times by date START )
document.addEventListener("dayChanged", async (event) => {
  try {
    let { startMonth, startDay } = event.detail;
    const garag = getWeekday(startMonth, startDay);
    const currentDate = new Date();
    const lastDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (6 - currentDate.getDay())
    );
    const selectedDate = new Date(
      currentDate.getFullYear(),
      startMonth,
      startDay
    );

    const week = selectedDate > lastDayOfWeek ? 2 : 1;
    const dayResponse = await fetch(
      `http://localhost:3000/times/${encodeURIComponent(
        classObj.roomID
      )}/${encodeURIComponent(`w${week}`)}/${encodeURIComponent(garag)}`
    );

    if (!dayResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const dayData = await dayResponse.json();
    console.log(dayData);
    const timeButtons = document.querySelector(".day-times");
    const timeBtnsHTML = dayData.data.map((timeObj) => {
      const timeInstance = new TimeBtn(timeObj);
      return timeInstance.Render();
    });
    timeButtons.innerHTML = timeBtnsHTML.join("");
  } catch (error) {
    console.error("Error:", error);
  }
});
// Get slot times by date END

function getWeekday(month, day) {
  const year = 2024;
  const date = new Date(year, month - 1, day);
  const weekdays = [
    "Ням",
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
  ];
  return weekdays[date.getDay()];
}

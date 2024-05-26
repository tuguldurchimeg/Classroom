import ClassRen from "./ClassRender.js";
const searchButton = document.getElementById("search");

let bairfinal = "Хичээлийн байр 2";
let startMonth = "5";
let startDay = "21";
let endMonth = "5";
let endDay = "31";
let startTsag = "07:40";
let endTsag = "21:45";

document.addEventListener("searched", async (event) => {
  try {
    let { bair, startMonth, startDay, endMonth, endDay, startTsag, endTsag } =
      event.detail;

    startTsag = convertToNumber(startTsag);
    endTsag = convertToNumber(endTsag);
    let garag = getWeekday(startMonth, startDay);

    let bairfinal;

    switch (bair) {
      case "1-р байр":
        bairfinal = "Хичээлийн төв байр";
        break;
      case "2-р байр":
        bairfinal = "Хичээлийн байр 2";
        break;
      case "4-р байр":
        bairfinal = "Хичээлийн байр 4";
        break;
      case "5-р байр":
        bairfinal = "Хичээлийн байр 5";
        break;
      case "7-р байр":
        bairfinal = "Хичээлийн байр 8";
        break;
      case "8-р байр":
        bairfinal = "Хичээлийн байр 8";
        break;
      case "E-Lib":
        bairfinal = "E-Номын сан";
        break;
      case "Хууль зүй":
        bairfinal = "Улаанбаатар сургуулийн хичээлийн байр";
        break;
      default:
        break;
    }

    // Construct the query string with parameters
    let queryString = `http://localhost:3000/filtered_classes/${encodeURIComponent(
      bairfinal
    )}/${encodeURIComponent(startTsag)}/${encodeURIComponent(
      endTsag
    )}/${encodeURIComponent(garag)}`;

    const response = await fetch(queryString);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Handle the response from the backend if needed
    const responseData = await response.json();
    console.log(responseData);

    let classSectionHTMLArray = responseData.data.map((classObj) => {
      const garagGroup = { day: garag, time: `${startTsag} - ${endTsag}` };
      const classInstance = new ClassRen(classObj, garagGroup);
      return classInstance.Render();
    });
    const classSectionHTML = classSectionHTMLArray.join("");
    document.getElementById("class-section1").innerHTML = classSectionHTML;
  } catch (error) {
    console.error("Error:", error);
  }
});

async function fetchClasses() {
  try {
    const response = await fetch("http://localhost:3000/classes");
    if (response.ok) return await response.json();
    console.error("Failed to retrieve classes. HTTP status:", response.status);
  } catch (error) {
    console.error("Error retrieving classes:", error);
  }
}

//--------------------------------------HUWAARI-FETCH & CONVERSION-------------------------------------------------------------------
async function fetchSchedule() {
  try {
    const response = await fetch("http://localhost:3000/time_slots");
    if (response.ok) return await response.json();
    console.error("Failed to retrieve classes. HTTP status:", response.status);
  } catch (error) {
    console.error("Error retrieving classes:", error);
  }
}

// ----------------------------------BAIR-BUTTON-LISTENERS----------------------------------------------------------------------

let classArrayObj = {};

// -------------------------------ADDITIONAL-FUNCTIONS-----------------------------------------------------------------------

const convertToNumber = (timeStr) => {
  if (timeStr) {
    const [hoursStr, minutesStr] = timeStr.split(":");
    return parseInt(hoursStr, 10) * 100 + parseInt(minutesStr, 10);
  }
  return 740;
};

const convertToTimeStamp = (minutes) => {
  const hours = Math.floor(minutes / 100);
  const mins = minutes % 100;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};
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

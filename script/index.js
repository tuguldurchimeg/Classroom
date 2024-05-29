import ClassRen from "./ClassRender.js";

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

    // Handle the response from the backend if needed
    const responseData = await response.json();
    console.log(responseData);

    let classSectionHTMLArray = responseData.data.map((classObj) => {
      const classInstance = new ClassRen(classObj);
      return classInstance.Render();
    });
    const classSectionHTML = classSectionHTMLArray.join("");
    document.getElementById("class-section1").innerHTML = classSectionHTML;
  } catch (error) {
    console.error("Error:", error);
  }
});

// -------------------------------ADDITIONAL-FUNCTIONS-----------------------------------------------------------------------

const convertToNumber = (timeStr) => {
  if (timeStr) {
    const [hoursStr, minutesStr] = timeStr.split(":");
    return parseInt(hoursStr, 10) * 100 + parseInt(minutesStr, 10);
  }
  return 740;
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

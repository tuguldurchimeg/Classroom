import ClassSec from "./ClassRender.js";

let bairVariable = "2";

const bairbtn = document.getElementById("bair-button");
const bairlist = document.getElementById("bair-list");
const calendarbtn = document.getElementById("calendar-button");
const calendarlist = document.getElementById("calendar-list");
const tsagbtn = document.getElementById("tsag-button");
const tsaglist = document.getElementById("tsag-list");
const searchButton = document.getElementById("search");

const profileBtn = document.getElementById("profile-btn");
const userPopUp = document.getElementById("user-popup");

profileBtn.addEventListener("click", () => {
  if (userPopUp.classList.contains("open")) {
    userPopUp.classList.remove("open");
  } else {
    userPopUp.classList.add("open");
  }
});

//-----------------------------------BAIR-LIST------------------------------------------------------------------

document.getElementById("bair-1").addEventListener("click", () => {
  bairVariable = "1";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "1-р байр";
});
document.getElementById("bair-2").addEventListener("click", () => {
  bairVariable = "2";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "2-р байр";
});
document.getElementById("bair-4").addEventListener("click", () => {
  bairVariable = "4";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "4-р байр";
});
document.getElementById("bair-5").addEventListener("click", () => {
  bairVariable = "5";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "5-р байр";
});
document.getElementById("bair-7").addEventListener("click", () => {
  bairVariable = "3А";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "3А-р байр";
});
document.getElementById("bair-8").addEventListener("click", () => {
  bairVariable = "8";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "8-р байр";
});
document.getElementById("bair-e-lib").addEventListener("click", () => {
  bairVariable = "E-Lib";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "E-Номын сан";
});
document.getElementById("bair-huuli").addEventListener("click", () => {
  bairVariable = "3Б";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "3Б-р байр";
});

function fetchData() {
  return fetch("https://api.npoint.io/70107af397f4a981c076")
    .then((response) => response.json())
    .then((responseObj) => {
      let filteredClasses = responseObj.filter((availableClass) => {
        return (
          availableClass.Хичээлийн_хуваарь_тавих_боломж !=
            "Хуваарь тавих боломжгүй" &&
          availableClass.Хичээлийн_байр != "Цөмийн судалгааны төв" &&
          availableClass.Хичээлийн_байр !=
            "Ховд сургуулийн хичээлийн 1-р байр" &&
          availableClass.Хичээлийн_байр !=
            "Ховд сургуулийн хичээлийн 2-р байр" &&
          availableClass.Хичээлийн_байр != "Дорнод сургуулийн хичээлийн байр" &&
          availableClass.Хичээлийн_байр != "Завхан сургуулийн хичээлийн байр" &&
          availableClass.Хичээлийн_байр != "Орхон сургуулийн хичээлийн байр" &&
          availableClass.Өрөөний_зориулалт != "Биеийн тамирын зал "
          // availableClass.Хичээлийн_байр == bairVariable
        );
      });
      return filteredClasses;
    });
}

//-----------------------------------------ODOR-LIST---------------------------------------------------------------

const currentDate = document.querySelector(".current-date"),
  daysTag = document.querySelector(".days"),
  prevNextIcon = document.querySelectorAll(".calendar-icons span");

const calendarTopFilter = document.querySelectorAll(".button-list li");
const tsagGrid = document.querySelectorAll(".tsag-list li");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth() + 1;
let today = date.getDate();

let startDay = today;
let endDay = today;
let startTsag = "07:40";
let endTsag = "21:45";

let firstSelectedDay = null;
let lastSelectedDay = null;

calendarTopFilter.forEach((tsag) => {
  tsag.addEventListener("click", () => {
    let a = date.getDate();
    firstSelectedDay = a;
    if (tsag.innerText == "1 өдөр") {
      lastSelectedDay = a;
    } else if (tsag.innerText == "7 хоног") {
      lastSelectedDay = a + 7;
    } else if (tsag.innerText == "2-7 хоног") {
      lastSelectedDay = a + 14;
    }
    document.getElementById(
      "odor-info"
    ).innerText = `${firstSelectedDay} - ${lastSelectedDay}`;
  });
});

//--------------------------------------TSAG-LIST--------------------------------------------------------------------------

let firstSelectedTsag = null;
let lastSelectedTsag = null;
tsagGrid.forEach((tsag) => {
  tsag.addEventListener("click", () => {
    if (!firstSelectedTsag && !tsag.classList.contains("inactive")) {
      firstSelectedTsag = tsag;
      startTsag = tsag.innerText;

      firstSelectedTsag.classList.add("tsag-active");
    } else if (!lastSelectedTsag && !tsag.classList.contains("inactive")) {
      lastSelectedTsag = tsag;
      endTsag = tsag.innerText;
      lastSelectedTsag.classList.add("tsag-active");

      const firstIndex = [...tsagGrid].indexOf(firstSelectedTsag);
      const lastIndex = [...tsagGrid].indexOf(lastSelectedTsag);

      const minIndex = Math.min(firstIndex, lastIndex);
      const maxIndex = Math.max(firstIndex, lastIndex);

      for (let i = minIndex + 1; i < maxIndex; i++) {
        tsagGrid[i].classList.add("tsag-active");
      }
      document.getElementById(
        "tsag-info"
      ).innerText = `${startTsag} - ${endTsag}`;
    } else if (tsag.classList.contains("inactive")) {
      //nothing;
    } else {
      // Reset selection if both first and last selected days are already set
      firstSelectedTsag.classList.remove("tsag-active");
      lastSelectedTsag.classList.remove("tsag-active");
      tsagGrid.forEach((tag) => {
        tag.classList.remove("tsag-active");
      });
      firstSelectedTsag = tsag;
      startTsag = tsag.innerText;
      lastSelectedTsag = null;
      tsag.classList.add("tsag-active");
    }
  });
});

//--------------------------------------HUWAARI-FETCH & CONVERSION-------------------------------------------------------------------
function fetching() {
  return fetch("https://api.npoint.io/7915813b5c6c20fecb21")
    .then((response) => response.json())
    .then((initialData) => {
      // console.log(initialData );

      const groupByUruuniiDugaar = (data) => {
        const groupedData = {};
        data.forEach((item) => {
          const {
            uruunii_khuviin_dugaar,
            garag,
            ekhlekh_tsag,
            duusakh_tsag,
            davtamj,
            oroltyn_too,
          } = item;
          if (!groupedData[uruunii_khuviin_dugaar]) {
            groupedData[uruunii_khuviin_dugaar] = {};
          }
          if (davtamj === "7 хоног тутам" && oroltyn_too === 16) {
            if (!groupedData[uruunii_khuviin_dugaar][garag]) {
              groupedData[uruunii_khuviin_dugaar][garag] = [];
            }
            groupedData[uruunii_khuviin_dugaar][garag].push({
              ekhlekh_tsag,
              duusakh_tsag,
            });
          }
        });
        return groupedData;
      };

      // Function to convert grouped data to the desired structure
      const convertToDesiredStructure = (groupedData) => {
        const result = [];
        for (const uruunii_khuviin_dugaar in groupedData) {
          const garagGroup = [];
          for (const garag in groupedData[uruunii_khuviin_dugaar]) {
            garagGroup.push({
              garag,
              khicheeliin_tsag: groupedData[uruunii_khuviin_dugaar][garag],
            });
          }
          result.push({
            uruunii_khuviin_dugaar,
            garagGroup,
          });
        }
        return result;
      };

      // Group the data by "uruunii_khuviin_dugaar" and then by "garag"
      const groupedByUruuniiDugaar = groupByUruuniiDugaar(initialData);
      // Convert the grouped data to the desired structure
      let huwaariArray = convertToDesiredStructure(groupedByUruuniiDugaar);

      let calculatingDate = new Date(currYear, currMonth - 1, startDay);
      let garagOfDate = calculatingDate.getDay();

      const weekdays = [
        "Ням",
        "Даваа",
        "Мягмар",
        "Лхагва",
        "Пүрэв",
        "Баасан",
        "Бямба",
      ];
      const weekdayName = weekdays[garagOfDate];

      let freeHuwaariArray = [];

      huwaariArray.forEach((element) => {
        let updatedGaragGroups = [];

        element.garagGroup.forEach((garagGroup) => {
          const classHoursSet = new Set([
            740, 825, 920, 1005, 1100, 1145, 1240, 1325, 1420, 1505, 1600, 1645,
            1740, 1825, 1920, 2005, 2100, 2145,
          ]);

          garagGroup.khicheeliin_tsag.forEach((khicheel) => {
            const ekhlekh_tsag = convertToNumber(khicheel.ekhlekh_tsag);
            const duusakh_tsag = convertToNumber(khicheel.duusakh_tsag);

            for (const item of classHoursSet) {
              if (item >= ekhlekh_tsag && item <= duusakh_tsag) {
                classHoursSet.delete(item);
              }
            }
          });

          updatedGaragGroups.push({
            garag: garagGroup.garag,
            classHoursSet: Array.from(classHoursSet),
          });
        });

        freeHuwaariArray.push({
          uruunii_khuviin_dugaar: element.uruunii_khuviin_dugaar,
          garagGroup: updatedGaragGroups,
        });
      });

      // console.log(freeHuwaariArray);
      return freeHuwaariArray;
    });
}
// ----------------------------------BAIR-BUTTON-LISTENERS----------------------------------------------------------------------

bairbtn.addEventListener("click", () => {
  if (bairlist.classList.contains("open")) bairlist.classList.remove("open");
  else {
    bairlist.classList.add("open");
    tsaglist.classList.remove("open");
    calendarlist.classList.remove("open-flex");
  }
});

calendarbtn.addEventListener("click", () => {
  if (calendarlist.classList.contains("open-flex")) {
    calendarlist.classList.remove("open-flex");
  } else {
    calendarlist.classList.add("open-flex");
    tsaglist.classList.remove("open");
    bairlist.classList.remove("open");
  }
});

tsagbtn.addEventListener("click", () => {
  if (tsaglist.classList.contains("open")) {
    tsaglist.classList.remove("open");
  } else {
    tsaglist.classList.add("open");
    bairlist.classList.remove("open");
    calendarlist.classList.remove("open-flex");
  }
});
let classArrayObj = {};

searchButton.addEventListener("click", () => {
  console.log(
    `${bairVariable} / (${startDay} - ${endDay}) / ${startTsag} - ${endTsag}`
  );
  bairlist.classList.remove("open");
  tsaglist.classList.remove("open");
  calendarlist.classList.remove("open-flex");

  fetching()
    .then((freeHuwaariArray) => {
      // console.log(freeHuwaariArray);
      fetchData().then((filteredClasses) => {
        classArrayObj = filteredClasses.map((classObj) => {
          let schedule = freeHuwaariArray.filter(
            (huwaari) =>
              huwaari.uruunii_khuviin_dugaar == classObj.Өрөөний_хувийн_дугаар
          );

          if (schedule.length > 0) {
            const classI = new ClassSec(classObj, schedule[0].garagGroup);
            return classI;
          }
          return null;
        });

        classArrayObj = classArrayObj.filter((classObj) => classObj !== null);

        let classSectionHTMLArray = classArrayObj
          .map((classObj) => {
            let temp;
            classObj.schedule.forEach((weekday) => {
              weekday.classHoursSet.forEach((time) => {
                if (
                  time >= convertToNumber(startTsag) &&
                  time <= convertToNumber(endTsag)
                ) {
                  console.log(
                    classObj.building +
                      "-" +
                      classObj.roomNo +
                      " " +
                      weekday.garag +
                      " " +
                      time
                  );

                  temp = classObj.Render();
                  return;
                }
              });
              return;
            });
            return temp != null ? temp : null;
          })
          .filter((classObj) => classObj != null);

        // console.log(classSectionHTMLArray);

        const classSectionHTML = classSectionHTMLArray.reduce(
          (prev, current) => prev + current
        );
        document.getElementById("class-section1").innerHTML = classSectionHTML;
      });
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
});

// -------------------------------ADDITIONAL-FUNCTIONS-----------------------------------------------------------------------

const convertToNumber = (timeStr) => {
  const [hoursStr, minutesStr] = timeStr.split(":");
  return parseInt(hoursStr, 10) * 100 + parseInt(minutesStr, 10);
};

const convertToTimeStamp = (minutes) => {
  const hours = Math.floor(minutes / 100);
  const mins = minutes % 100;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

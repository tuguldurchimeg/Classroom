import ClassRen from "./ClassRender.js";

const searchButton = document.getElementById("search");

let bairfinal = "Хичээлийн байр 2";
let startMonth = "5";
let startDay = "21";
let endMonth = "5";
let endDay = "31";
let startTsag = "07:40";
let endTsag = "21:45";
document.addEventListener("searched", (event) => {
  const { bair } = event.detail;
  const { startMonth } = event.detail;
  const { startDay } = event.detail;
  const { endMonth } = event.detail;
  const { endDay } = event.detail;
  const { startTsag } = event.detail;
  const { endTsag } = event.detail;

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
            const classI = new ClassRen(classObj, schedule[0].garagGroup);
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

//--------------------------------------HUWAARI-FETCH & CONVERSION-------------------------------------------------------------------
function fetching() {
  return fetch("https://api.npoint.io/7915813b5c6c20fecb21")
    .then((response) => response.json())
    .then((initialData) => {
      const groupByUruuniiDugaar = (data) => {
        const groupedData = {};
        data.forEach((item) => {
          const {
            khicheellekh_bair,
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
          if (
            davtamj === "7 хоног тутам" &&
            oroltyn_too === 16 &&
            khicheellekh_bair === bairfinal
          ) {
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
          // Only push if garagGroup is not empty
          if (garagGroup.length > 0) {
            result.push({
              uruunii_khuviin_dugaar,
              garagGroup,
            });
          }
        }
        return result;
      };

      // Group the data by "uruunii_khuviin_dugaar" and then by "garag"
      const groupedByUruuniiDugaar = groupByUruuniiDugaar(initialData);
      // Convert the grouped data to the desired structure
      let huwaariArray = convertToDesiredStructure(groupedByUruuniiDugaar);

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

      return freeHuwaariArray;
    });
}

// ----------------------------------BAIR-BUTTON-LISTENERS----------------------------------------------------------------------

let classArrayObj = {};

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

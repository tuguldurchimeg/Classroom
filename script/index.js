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

  fetchSchedule()
    .then((freeHuwaariArray) => {
      console.log(freeHuwaariArray);
      fetchClasses().then((filteredClasses) => {
        console.log(filteredClasses);
        classArrayObj = filteredClasses.map((classObj) => {
          let schedule = freeHuwaariArray.filter(
            (huwaari) => huwaari.uruunii_khuviin_dugaar == classObj.room_id
          );

          if (schedule.length > 0) {
            const classI = new ClassRen(classObj, schedule[0].garagGroup);
            return classI;
          }
          return null;
        });

        classArrayObj = classArrayObj.filter((classObj) => classObj !== null);
        // console.log(classArrayObj);
        let classSectionHTMLArray = classArrayObj
          .map((classObj) => {
            let temp;
            classObj.schedule.forEach((weekday) => {
              weekday.classHoursSet.forEach((time) => {
                if (
                  time >= convertToNumber(startTsag) &&
                  time <= convertToNumber(endTsag)
                ) {
                  // console.log(
                  //   classObj.building +
                  //     "-" +
                  //     classObj.roomNo +
                  //     " " +
                  //     weekday.garag +
                  //     " " +
                  //     time
                  // );

                  temp = classObj.Render();
                  return;
                }
              });
              return;
            });
            return temp != null ? temp : null;
          })
          .filter((classObj) => classObj != null);

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
    const response = await fetch("https://api.npoint.io/7915813b5c6c20fecb21");
    const initialData = await response.json();

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
        if (garagGroup.length > 0) {
          result.push({
            uruunii_khuviin_dugaar,
            garagGroup,
          });
        }
      }
      return result;
    };

    const convertToNumber = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const convertToTimeString = (timeNumber) => {
      const hours = Math.floor(timeNumber / 60);
      const minutes = timeNumber % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    };

    const groupedByUruuniiDugaar = groupByUruuniiDugaar(initialData);
    const huwaariArray = convertToDesiredStructure(groupedByUruuniiDugaar);

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

    const timeSlotData = {
      room_id: "",
      garag: "",
      time: 0,
    };

    for (const room of freeHuwaariArray) {
      for (const garagG of room.garagGroup) {
        for (const time of garagG.classHoursSet) {
          timeSlotData.room_id = room.uruunii_khuviin_dugaar;
          timeSlotData.garag = garagG.garag;
          timeSlotData.time = time;

          try {
            const response = await fetch("http://localhost:3000/time_slots", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(timeSlotData),
            });

            if (response.ok) {
              console.log("time_slots data inserted successfully.");
            } else {
              console.error(
                "Failed to insert time_slots data. HTTP status:",
                response.status
              );
            }
          } catch (error) {
            console.error("Error inserting time_slots data:", error);
          }
        }
      }
    }

    return freeHuwaariArray;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
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

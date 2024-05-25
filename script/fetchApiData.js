async function fetchClasses() {
  const response = await fetch("https://api.npoint.io/70107af397f4a981c076");
  const responseObj = await response.json();
  let filteredClasses = responseObj.filter((availableClass) => {
    return (
      availableClass.Хичээлийн_хуваарь_тавих_боломж !=
        "Хуваарь тавих боломжгүй" &&
      availableClass.Хичээлийн_байр != "Цөмийн судалгааны төв" &&
      availableClass.Хичээлийн_байр != "Ховд сургуулийн хичээлийн 1-р байр" &&
      availableClass.Хичээлийн_байр != "Ховд сургуулийн хичээлийн 2-р байр" &&
      availableClass.Хичээлийн_байр != "Дорнод сургуулийн хичээлийн байр" &&
      availableClass.Хичээлийн_байр != "Завхан сургуулийн хичээлийн байр" &&
      availableClass.Хичээлийн_байр != "Орхон сургуулийн хичээлийн байр" &&
      availableClass.Өрөөний_зориулалт != "Биеийн тамирын зал "
      // availableClass.Хичээлийн_байр == bairVariable
    );
  });
  const classesData = {
    room_id: "",
    roomNo: 0,
    building: "",
    type: "",
    capacity: "",
    projector: false,
  };
  filteredClasses.forEach(async (classD) => {
    classesData.room_id = classD.Өрөөний_хувийн_дугаар;
    classesData.roomNo = classD.Өрөөний_дугаар;
    classesData.building = classD.Хичээлийн_байр;
    classesData.type = classD.Өрөөний_зориулалт;
    classesData.capacity = classD.Суудлын_тоо;
    classesData.projector =
      classD.Проектортой_эсэх == "Проектортой" ? true : false;

    try {
      const response_1 = await fetch("http://localhost:3000/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classesData),
      });

      if (response_1.ok) {
        console.log("Classes data inserted successfully.");
      } else {
        console.error(
          "Failed to insert classes data. HTTP status:",
          response_1.status
        );
      }
    } catch (error) {
      console.error("Error inserting classes data:", error);
    }
  });
  return filteredClasses;
}

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

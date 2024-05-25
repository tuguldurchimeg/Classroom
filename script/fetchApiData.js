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

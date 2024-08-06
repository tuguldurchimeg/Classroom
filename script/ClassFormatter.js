export default class ClassFormatter {
  formatBuilding(building) {
    if (building === "E-Номын сан") return "Е-lib";
    if (building === "Хичээлийн төв байр") return "1";
    if (building === "Улаанбаатар сургуулийн хичээлийн байр") return "Хууль";
    return building.slice(-1);
  }

  formatType(type) {
    if (type === "Хичээлийн танхим" || type === "Семинарын танхим")
      return "Семинар";
    if (type === "Лекцийн танхим") return "Лекц";
    if (type === "Сургалтын лаборатори") return "Лаб";
    return type;
  }
  reformatBuilding(building) {
    if (building === "E-lib") return "Е-Номын сан";
    if (building === "1") return "Хичээлийн төв байр";
    if (building === "Хууль") return "Улаанбаатар сургуулийн хичээлийн байр";
    return "Хичээлийн байр " + building;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so we add 1

    const englishToMongolianWeekdays = {
      Mon: "Да",
      Tue: "Мя",
      Wed: "Лх",
      Thu: "Пү",
      Fri: "Ба",
      Sat: "Бя",
      Sun: "Ня",
    };

    const weekday =
      englishToMongolianWeekdays[
        date.toLocaleString("en-US", { weekday: "short" })
      ];

    return `${month}.${day} - ${weekday}`;
  }

  formatTime(timeInteger) {
    let hours = Math.floor(timeInteger / 100);
    let minutes = timeInteger % 100;

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    return `${hours}:${minutes}`;
  }
}

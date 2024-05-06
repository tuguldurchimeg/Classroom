export default class ClassSec {
  constructor(classObj, garagGroup) {
    this.roomID = classObj.Өрөөний_хувийн_дугаар;

    this.building = classObj.Хичээлийн_байр;
    this.roomNo = classObj.Өрөөний_дугаар;
    this.type = classObj.Өрөөний_зориулалт;
    this.capacity = classObj.Суудлын_тоо;
    this.projector = classObj.Проектортой_эсэх;
    this.schedule = garagGroup;

    if (this.building == "E-Номын сан") this.building = "Е-lib";
    else if (this.building == "Хичээлийн төв байр") this.building = "1";
    else if (this.building == "Улаанбаатар сургуулийн хичээлийн байр")
      this.building = "Хууль";
    else this.building = this.building.slice(-1);

    if (this.type == "Хичээлийн танхим" || this.type == "Семинарын танхим")
      this.type = "Семинар";
    else if (this.type == "Лекцийн танхим") this.type = "Лекц";
    else if (this.type == "Сургалтын лаборатори") this.type = "Лаб";
  }
  Render() {
    return ` <class-section data=${encodeURIComponent(
      JSON.stringify(this)
    )}> </class-section> `;
  }
}

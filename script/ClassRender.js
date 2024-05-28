export default class ClassRen {
  constructor(classObj) {
    this.roomID = classObj.room_id;
    this.building = classObj.building;
    this.roomNo = classObj.roomno;
    this.type = classObj.type;
    this.capacity = classObj.capacity;
    this.projector = classObj.projector;

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
    return ` <class-section 
                build=${this.building} 
                roomNo=${this.roomNo} 
                roomID=${this.roomID}
                type=${this.type}
                cap=${this.capacity}
                proj=${this.projector}
                sched=${this.schedule}
    > </class-section> `;
  }
}

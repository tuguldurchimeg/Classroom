import ClassFormatter from "./ClassFormatter.js";

export default class ClassRen {
  constructor(classObj) {
    this.roomID = classObj.room_id;
    this.building = classObj.building;
    this.roomNo = classObj.roomno;
    this.type = classObj.type;
    this.capacity = classObj.capacity;
    this.projector = classObj.projector;

    const formatter = new ClassFormatter();
    this.building = formatter.formatBuilding(this.building);
    this.type = formatter.formatType(this.type);
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

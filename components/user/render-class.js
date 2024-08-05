import ClassFormatter from "../../script/ClassFormatter.js";

export class RenderClass {
  constructor(data) {
    this.data = data;
  }

  render_class_list() {
    const { data } = this;
    const encodedData = encodeURIComponent(JSON.stringify(data));
    const formatter = new ClassFormatter();
    data.building = formatter.formatBuilding(data.building);
    data.type = formatter.formatType(data.type);
    data.date = formatter.formatDate(data.date);
    return `
            <article class="class-section-2">
                <div class="img">
                    <img src="styles/assets/class.jpg" alt="classroom pic" class="image">
                </div>
                <section class="details">
                <a href="class.html?id=${encodedData}">
                    <div class="heartdetailsgrid">
                        <div class="font">
                            <h3>${data.building} - ${data.roomno}</h3>
                            <div class="class-type">${data.type}</div>
                        </div>
                    </div>
                    <ul class="details-list">
                        <li>${data.date}</li>
                        <li>
                            <button class="start-time-btn"><span> time </span></button>
                        </li>
                        <li>
                            <button class="end-time-btn"><span> time </span></button>
                        </li>
                    </ul>
                 </a>
                </section>
                <div class="cancel">
                    <button class="cancel-btn" data-id="${data.room_id}"><img src="styles/assets/cancal.png" alt="cancel"></button>
                </div>
            </article>
        `;
  }
}

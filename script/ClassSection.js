export default class ClassSec {
  constructor(classObj) {
    this.classObj = classObj;
  }
  Render() {
    return `<a href="class.html" class="class-section-1">
            <article>
              <img
                src="styles/assets/class.jpg"
                alt="classroom-picture"
                class="image"
              />
              <div class="text-wrapper">
                <h3>
                  ${this.classObj.Хичээлийн_байр.slice(-2)} - ${
      this.classObj.Өрөөний_дугаар
    }
                </h3>
                <img
                  src="styles/assets/Heart-grey.svg"
                  alt="like this class"
                  class="heart-grey"
                />
                <div class="class-type">${this.classObj.Өрөөний_зориулалт}</div>
                <div class="class-info">
                  <div class="seat-count">${this.classObj.Суудлын_тоо}</div>
                  ${
                    this.classObj.Проектортой_эсэх === "Проектортой"
                      ? '<div class="projector proj-on"></div>'
                      : '<div class="projector proj-off"></div>'
                  }
                </div>
              </div>
            </article>
          </a>
      `;
  }
}

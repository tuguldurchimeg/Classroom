export default class ClassSec {
  constructor(classObj) {
    this.classObj = classObj;

    if (this.classObj.Хичээлийн_байр == "E-Номын сан")
      this.classObj.Хичээлийн_байр = "Е-lib";
    else if (this.classObj.Хичээлийн_байр == "Хичээлийн төв байр")
      this.classObj.Хичээлийн_байр = "1";
    else if (
      this.classObj.Хичээлийн_байр == "Улаанбаатар сургуулийн хичээлийн байр"
    )
      this.classObj.Хичээлийн_байр = "Хууль";
    else this.classObj.Хичээлийн_байр = this.classObj.Хичээлийн_байр.slice(-2);

    if (
      this.classObj.Өрөөний_зориулалт == "Хичээлийн танхим" ||
      this.classObj.Өрөөний_зориулалт == "Семинарын танхим"
    )
      this.classObj.Өрөөний_зориулалт = "Семинар";
    else if (this.classObj.Өрөөний_зориулалт == "Лекцийн танхим")
      this.classObj.Өрөөний_зориулалт = "Лекц";
    else if (this.classObj.Өрөөний_зориулалт == "Сургалтын лаборатори")
      this.classObj.Өрөөний_зориулалт = "Лаб";
  }
  Render() {
    const encodedData = encodeURIComponent(JSON.stringify(this.classObj));
    // console.log(encodedData);
    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set("id", this.classObj.Өрөөний_хувийн_дугаар);

    return `<a href="class.html?id=${encodedData}" class="class-section-1">
            <article>
              <img
                src="styles/assets/class.jpg"
                alt="classroom-picture"
                class="image"
              />
              <div class="text-wrapper">
                <h3>
                  ${this.classObj.Хичээлийн_байр} - 
                  ${this.classObj.Өрөөний_дугаар}
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

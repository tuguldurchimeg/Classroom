const usp = new URLSearchParams(document.location.search);
const filterValue = usp.get("id");
console.log(filterValue);

let jsonData;
fetch("https://api.npoint.io/70107af397f4a981c076")
  .then((response) => response.json())
  .then((responseObj) => {
    jsonData = responseObj;

    let filteredClass = jsonData.filter(
      (availableClass) => availableClass.Өрөөний_хувийн_дугаар == filterValue
    );

    let classTitleHTML = "";
    let mainInfoHTML = "";

    filteredClass.forEach((classObj) => {
      if (classObj.Хичээлийн_байр == "E-Номын сан")
        classObj.Хичээлийн_байр = "Е-lib";
      else if (classObj.Хичээлийн_байр == "Хичээлийн төв байр")
        classObj.Хичээлийн_байр = "1";
      else if (
        classObj.Хичээлийн_байр == "Улаанбаатар сургуулийн хичээлийн байр"
      )
        classObj.Хичээлийн_байр = "Хууль";
      else classObj.Хичээлийн_байр = classObj.Хичээлийн_байр.slice(-2);

      if (
        classObj.Өрөөний_зориулалт == "Хичээлийн танхим" ||
        classObj.Өрөөний_зориулалт == "Семинарын танхим"
      )
        classObj.Өрөөний_зориулалт = "Семинар";
      else if (classObj.Өрөөний_зориулалт == "Лекцийн танхим")
        classObj.Өрөөний_зориулалт = "Лекц";
      else if (classObj.Өрөөний_зориулалт == "Сургалтын лаборатори")
        classObj.Өрөөний_зориулалт = "Лаб";

      classTitleHTML += `
    <h2 class="heading-3">
      <span>${classObj.Хичээлийн_байр} - ${classObj.Өрөөний_дугаар}</span>
    <h2>
    <img src="styles/assets/class.jpg" alt="class image" class="class-img">
  `;

      mainInfoHTML += `
    <li><span class="type-m heading-6">${classObj.Өрөөний_зориулалт}</span></li>
    <li><div class="vl"></div></li>
    <li>
        <div class="info-desc">Суудлын тоо</div>
        <div class="seat-count-m heading-6">${classObj.Суудлын_тоо}</div>
    </li>
    <li><div class="vl"></div></li>
    <li>
        <div class="info-desc" id="projector-info">Проектор</div>
        <img
          src="${
            classObj.Проектортой_эсэх === "Проектортой"
              ? "styles/assets/Check.svg"
              : "styles/assets/X.svg"
          }"
          alt="projector"
          class="proj-state"
        />
    </li>
  `;
    });

    document.getElementById("main-title").innerHTML = classTitleHTML;
    document.getElementById("main-desc").innerHTML = mainInfoHTML;

    document.getElementById("main-title").innerHTML = classTitleHTML;
    document.getElementById("main-desc").innerHTML = mainInfoHTML;
  });

fetch("https://api.npoint.io/27a8f82a17770a91b263")
  .then((response) => response.json())
  .then((classObj) => {});

// let addRatingBtn = document.getElementById("add-rating-btn");

// addRatingBtn.addEventListener("click", function () {
//   displayPopUP("rating-pop-up");
// });

// function displayPopUP(popup) {
//   document.getElementsByClassName(popup)[0].style.display = "block";
// }

const profileBtn = document.getElementById("profile-btn");

profileBtn.addEventListener("click", () => {
  const userPopUp = document.getElementById("user-popup");
  openPopUp(userPopUp);
});

function openPopUp(modal) {
  if (modal == null) return;
  modal.style.display = "block";
  modal.style.visibility = "visible";
  console.log(modal.style);
}

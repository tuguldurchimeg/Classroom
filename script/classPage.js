const usp = new URLSearchParams(document.location.search);
const classObj = JSON.parse(usp.get("id"));
console.log(classObj);

let classTitleHTML = "";
let mainInfoHTML = "";

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

document.getElementById("main-title").innerHTML = classTitleHTML;
document.getElementById("main-desc").innerHTML = mainInfoHTML;

fetch("https://api.npoint.io/144f8502239edcab18c5")
  .then((response) => response.json())
  .then((scheduleObj) => {
    scheduleObj = scheduleObj.filter(
      (schedules) =>
        schedules.uruunii_khuviin_dugaar == classObj.Өрөөний_хувийн_дугаар
    );
    console.log(scheduleObj);
  });

// let addRatingBtn = document.getElementById("add-rating-btn");

// addRatingBtn.addEventListener("click", function () {
//   displayPopUP("rating-pop-up");
// });

// function displayPopUP(popup) {
//   document.getElementsByClassName(popup)[0].style.display = "block";
// }

// const profileBtn = document.getElementById("profile-btn");

// profileBtn.addEventListener("click", () => {
//   const userPopUp = document.getElementById("user-popup");
//   userPopUp.classList.add("active");
// });

// function openPopUp(modal) {
//   if (modal == null) return;
//   modal.classList.add("active");
//   console.log(modal.style);
// }

// const timeBtn = document.getElementsByClassName("timeBtn");
// timeBtn.addEventListener("click", () => {
//   timeBtn.classList.add("timeBtnClick");
// });

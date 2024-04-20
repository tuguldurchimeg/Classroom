// const usp = new URLSearchParams(document.location.search);
// const filterValue = usp.get("Хуваарь тавих боломжгүй");

fetch("https://api.npoint.io/70107af397f4a981c076")
  .then((response) => response.json())
  .then((responseObj) => {
    const jsonData = responseObj;

    let filteredClasses = jsonData.filter(function (availableClass) {
      return (
        availableClass["Хичээлийн_хуваарь_тавих_боломж"] !=
          "Хуваарь тавих боломжгүй" &&
        availableClass["Хичээлийн_байр"] != "Багш оюутны хөгжлийн төв" &&
        availableClass["Хичээлийн_байр"] !=
          "Дорнод сургуулийн хичээлийн байр" &&
        availableClass["Хичээлийн_байр"] !=
          "Завхан сургуулийн хичээлийн байр" &&
        availableClass["Хичээлийн_байр"] != "Цөмийн судалгааны төв" &&
        availableClass["Хичээлийн_байр"] !=
          "Ховд сургуулийн хичээлийн 1-р байр" &&
        availableClass["Хичээлийн_байр"] !=
          "Ховд сургуулийн хичээлийн 2-р байр" &&
        availableClass["Хичээлийн_байр"] != "Орхон сургуулийн хичээлийн байр" &&
        availableClass["Өрөөний_зориулалт"] != "Биеийн тамирын зал "
      );
    });

    let classTitleHTML = `
    <h2 class="heading-3">
    <span>${filteredClasses[2].Хичээлийн_байр.slice(-2)} - ${
      filteredClasses[2].Өрөөний_дугаар
    }</span>
    <h2>
    <img src="styles/assets/class.jpg" alt="class image" class="class-img">
    `;

    let mainInfoHTML = ` 
    <li><span class="type-m heading-6">${
      filteredClasses[2].Өрөөний_зориулалт
    }</span></li>
    <li><div class="vl"></div></li>
    <li>
        <div class="info-desc">Суудлын тоо</div>
        <div class="seat-count-m heading-6">${
          filteredClasses[2].Суудлын_тоо
        }</div>
    </li>
    <li><div class="vl"></div></li>
    <li>
        <div class="info-desc" id="projector-info">Проектор</div>
        <img 
          src="${
            filteredClasses[2].Проектортой_эсэх === "Проектортой"
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
  });

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

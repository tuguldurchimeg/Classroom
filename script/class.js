let addRatingBtn = document.getElementById("add-rating-btn");

addRatingBtn.addEventListener("click", displayPopUP("rating-pop-up"));

function displayPopUP(popup) {
  document.getElementsByClassName("rating-pop-up").style.display = "block";
}

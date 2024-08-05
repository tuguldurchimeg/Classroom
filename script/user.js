document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const userMenu = urlParams.get("user-menu");

  // If user-menu parameter exists, find the corresponding input and add class
  if (userMenu) {
    const inputElement = document.getElementById(userMenu);
    if (inputElement) {
      inputElement.checked = true;
      inputElement.parentElement.classList.add("active");
    } else {
      inputElement.checked = false;
      inputElement.parentElement.classList.remove("active");
    }
  }
});

const logoutBtn = document.querySelector(".log-out");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("Амжилттай гарлаа!");
  });
}

const bairbtn = document.getElementById("bair-button");
const bairlist = document.getElementById("bair-list");
const calendarbtn = document.getElementById("calendar-button");
const calendarlist = document.getElementById("calendar-list");


// ----------------------------------------------------------CALENDAR------------------------------------------------------------------

const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".calendar-icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth()+1;
let today = date.getDate();

const renderCalendar = () =>{
   let firstDayOfMonth = new Date(currYear, currMonth - 1, 1).getDay(); // Subtract 1 from currMonth
   let lastDateOfMonth = new Date(currYear, currMonth, 0).getDate(); // No need to add 1 to currMonth here
   let lastDayOfMonth = new Date(currYear, currMonth - 1, lastDateOfMonth).getDay(); // Subtract 1 from currMonth
   let lastDateofLastMonth = new Date(currYear, currMonth - 1, 0).getDate(); // Subtract 1 from currMonth

   let liTag = "";

   for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
   }

   for (let i = 1; i <= lastDateOfMonth; i++) {
      if (i < today) {
         liTag += `<li class="inactive">${i}</li>`;
     } else {
         liTag += `<li>${i}</li>`;
     }
   }

   for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
   }

   currentDate.innerText = `${currMonth}-р сар ${currYear}`;
   daysTag.innerHTML = liTag;

   day = document.querySelectorAll(".days li");

   let firstSelectedDay = null;
   let lastSelectedDay = null;

   day.forEach(dayTag => {
      dayTag.addEventListener("click", () => {
          if (!firstSelectedDay && !dayTag.classList.contains("inactive")) {
              firstSelectedDay = dayTag;
              firstSelectedDay.classList.add("day-active");
          } else if (!lastSelectedDay && !dayTag.classList.contains("inactive")) {
              lastSelectedDay = dayTag;
              lastSelectedDay.classList.add("day-active");
            
              const firstIndex = [...day].indexOf(firstSelectedDay);
              const lastIndex = [...day].indexOf(lastSelectedDay);
   
              const minIndex = Math.min(firstIndex, lastIndex);
              const maxIndex = Math.max(firstIndex, lastIndex);
   
              for (let i = minIndex + 1; i < maxIndex; i++) {
                  day[i].classList.add("day-active");
              }
          } else if (dayTag.classList.contains("inactive")){
               //nothing;
          } else {
              // Reset selection if both first and last selected days are already set
              firstSelectedDay.classList.remove("day-active");
              lastSelectedDay.classList.remove("day-active");
              day.forEach(tag => {
                  tag.classList.remove("day-active");
              });
              firstSelectedDay = dayTag;
              lastSelectedDay = null;
              dayTag.classList.add("day-active");
          }
      });
   });
   firstSelectedDay = null;
   lastSelectedDay = null;
}
renderCalendar();

prevNextIcon.forEach(icon => {
   icon.addEventListener("click", ()=>{
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

      if (currMonth < 1) {
         currYear--;
         currMonth = 12; // Set to December
      } else if (currMonth > 12) {
         currYear++;
         currMonth = 1; // Set to January
      }

      renderCalendar();
   });
});






// ----------------------------------------------------------CALENDAR-END-----------------------------------------------------------------

bairbtn.addEventListener("click", ()=>{
   if(bairlist.classList.contains("open"))
      bairlist.classList.remove("open");
   else 
      bairlist.classList.add("open");
});

calendarbtn.addEventListener('click',() => {
   if(calendarlist.classList.contains("open-flex"))
      calendarlist.classList.remove("open-flex");
   else
      calendarlist.classList.add("open-flex");
});
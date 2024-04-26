// const bairbtn = document.getElementById("bair-button");
// const bairlist = document.getElementById("bair-list");
// const calendarbtn = document.getElementById("calendar-button");
// const calendarlist = document.getElementById("calendar-list");
// const tsagbtn = document.getElementById("tsag-button");
// const tsaglist = document.getElementById("tsag-list");
// const searchButton = document.getElementById("search");

// let startDay;
// let endDay;
// let startTsag;
// let endTsag;

// let firstSelectedDay = null;
// let lastSelectedDay = null;

// // ----------------------------------------------------------CALENDAR------------------------------------------------------------------

// const currentDate = document.querySelector(".current-date");
// daysTag = document.querySelector(".days");
// prevNextIcon = document.querySelectorAll(".calendar-icons span");

// const calendarTopFilter = document.querySelectorAll(".button-list li");
// const tsagGrid = document.querySelectorAll(".tsag-list li");

// let date = new Date(),
// currYear = date.getFullYear(),
// currMonth = date.getMonth()+1;
// let today = date.getDate();

// firstSelectedDay = null;
// lastSelectedDay = null;

// const renderCalendar = () =>{
//    let firstDayOfMonth = new Date(currYear, currMonth - 1, 1).getDay(); // Subtract 1 from currMonth
//    let lastDateOfMonth = new Date(currYear, currMonth, 0).getDate(); // No need to add 1 to currMonth here
//    let lastDayOfMonth = new Date(currYear, currMonth - 1, lastDateOfMonth).getDay(); // Subtract 1 from currMonth
//    let lastDateofLastMonth = new Date(currYear, currMonth - 1, 0).getDate(); // Subtract 1 from currMonth


//    let liTag = "";

//    for (let i = firstDayOfMonth; i > 0; i--) {
//       liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
//    }
//    for (let i = 1; i <= lastDateOfMonth; i++) {
//       if (i < today) {
//          liTag += `<li class="inactive">${i}</li>`;
//      } else {
//          liTag += `<li>${i}</li>`;
//      }
//    }
//    for (let i = lastDayOfMonth; i < 6; i++) {
//       liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
//    }

//    currentDate.innerText = `${currMonth}-р сар ${currYear}`;
//    daysTag.innerHTML = liTag;

//    day = document.querySelectorAll(".days li");


//    day.forEach(dayTag => {
//       dayTag.addEventListener("click", () => {
//           if (!firstSelectedDay && !dayTag.classList.contains("inactive")) {
//               firstSelectedDay = dayTag;
//               firstSelectedDay.classList.add("day-active");
//               startDay = firstSelectedDay.innerText;
//           } else if (!lastSelectedDay && !dayTag.classList.contains("inactive")) {
//               lastSelectedDay = dayTag;
//               lastSelectedDay.classList.add("day-active");
//               endDay = lastSelectedDay.innerText;
            
//               const firstIndex = [...day].indexOf(firstSelectedDay);
//               const lastIndex = [...day].indexOf(lastSelectedDay);
   
//               const minIndex = Math.min(firstIndex, lastIndex);
//               const maxIndex = Math.max(firstIndex, lastIndex);
   
//               for (let i = minIndex + 1; i < maxIndex; i++) {
//                   day[i].classList.add("day-active");
//               }
//           } else if (dayTag.classList.contains("inactive")){
//                //nothing;
//           } else {
//               // Reset selection if both first and last selected days are already set
//               firstSelectedDay.classList.remove("day-active");
//               lastSelectedDay.classList.remove("day-active");
//               day.forEach(tag => {
//                   tag.classList.remove("day-active");
//               });
//               firstSelectedDay = dayTag;
//               lastSelectedDay = null;
//               dayTag.classList.add("day-active");
//               startDay = firstSelectedDay.innerText;
//           }
//       });
//    });
   
// }
// renderCalendar();

   

// prevNextIcon.forEach(icon => {
//    today = 0;
//    icon.addEventListener("click", ()=>{
//       currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

//       if (currMonth < 1) {
//          currYear--;
//          currMonth = 12; // Set to December
//       } else if (currMonth > 12) {
//          currYear++;
//          currMonth = 1; // Set to January
//       }

//       renderCalendar();
//    });
// });

// calendarTopFilter.forEach(tsag => {
//    tsag.addEventListener("click", ()=>{
//       let a = date.getDate();
//       firstSelectedDay = a;
//       if (tsag.innerText == "1 өдөр"){
//          lastSelectedDay = a;
//       } else if (tsag.innerText == "7 хоног"){
//          lastSelectedDay = a+7;
//       } else if (tsag.innerText == "2-7 хоног"){
//          lastSelectedDay = a+14;
//       }
//    });
// });

// let firstSelectedTsag = null;
// let lastSelectedTsag = null;
// tsagGrid.forEach(tsag =>{
//    tsag.addEventListener("click", ()=>{
//       if (!firstSelectedTsag && !tsag.classList.contains("inactive")) {
//          firstSelectedTsag = tsag;
//          startTsag = tsag;

//          firstSelectedTsag.classList.add("tsag-active");
//      } else if (!lastSelectedTsag && !tsag.classList.contains("inactive")) {
//       lastSelectedTsag = tsag;
//       endTsag = tsag;
//       lastSelectedTsag.classList.add("tsag-active");
       
//          const firstIndex = [...tsagGrid].indexOf(firstSelectedTsag);
//          const lastIndex = [...tsagGrid].indexOf(lastSelectedTsag);

//          const minIndex = Math.min(firstIndex, lastIndex);
//          const maxIndex = Math.max(firstIndex, lastIndex);

//          for (let i = minIndex + 1; i < maxIndex; i++) {
//              tsagGrid[i].classList.add("tsag-active");
//          }
//      } else if (tsag.classList.contains("inactive")){
//           //nothing;
//      } else {
//          // Reset selection if both first and last selected days are already set
//          firstSelectedTsag.classList.remove("tsag-active");
//          lastSelectedTsag.classList.remove("tsag-active");
//          tsagGrid.forEach(tag => {
//             tag.classList.remove("tsag-active");
//          });
//          firstSelectedTsag = tsag;
//          startTsag = tsag;
//          lastSelectedTsag = null;
//          tsag.classList.add("tsag-active");
//      }
//    });
// });


// // ----------------------------------------------------------CALENDAR-END-----------------------------------------------------------------

// bairbtn.addEventListener("click", ()=>{
//    if(bairlist.classList.contains("open"))
//       bairlist.classList.remove("open");
//    else 
//       bairlist.classList.add("open");
// });

// calendarbtn.addEventListener('click',() => {
//    if(calendarlist.classList.contains("open-flex"))
//       calendarlist.classList.remove("open-flex");
//    else
//       calendarlist.classList.add("open-flex");
// });

// tsagbtn.addEventListener("click", () => {
//    if(tsaglist.classList.contains("open")){
//       tsaglist.classList.remove("open");
//    }
//    else 
//       tsaglist.classList.add("open");
// });

// searchButton.addEventListener("click", () => {
//    console.log()
// })
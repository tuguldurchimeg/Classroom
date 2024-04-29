import ClassSec from "./ClassSection.js";

let bairVariable = "Хичээлийн төв байр";
// fetchData();
const bairbtn = document.getElementById("bair-button");
const bairlist = document.getElementById("bair-list");
const calendarbtn = document.getElementById("calendar-button");
const calendarlist = document.getElementById("calendar-list");
const tsagbtn = document.getElementById("tsag-button");
const tsaglist = document.getElementById("tsag-list");
const searchButton = document.getElementById("search");



//-----------------------------------BAIR-LIST------------------------------------------------------------------

document.getElementById('bair-1').addEventListener('click',() =>{
  bairVariable = "Хичээлийн төв байр";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "1-р байр";
});
document.getElementById('bair-2').addEventListener('click',() =>{
  bairVariable = "Хичээлийн байр 2";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "2-р байр";
});
document.getElementById('bair-4').addEventListener('click',() =>{
  bairVariable = "Хичээлийн байр 4";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "4-р байр";
});
document.getElementById('bair-5').addEventListener('click',() =>{
  bairVariable = "Хичээлийн байр 5";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "5-р байр";
});
document.getElementById('bair-7').addEventListener('click',() =>{
  bairVariable = "Хичээлийн байр 3А";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "3А-р байр";
});
document.getElementById('bair-8').addEventListener('click',() =>{
  bairVariable = "Хичээлийн байр 8";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "8-р байр";
});
document.getElementById('bair-e-lib').addEventListener('click',() =>{
  bairVariable = "E-Номын сан";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "E-Номын сан";
});
document.getElementById('bair-huuli').addEventListener('click',() =>{
  bairVariable = "Хичээлийн байр 3Б";
  bairlist.classList.remove("open");
  document.getElementById("bair-info").innerText = "3Б-р байр";
});

// function fetchData() {
//   fetch("https://api.npoint.io/70107af397f4a981c076")
//   .then((response) => response.json())
//   .then((responseObj) => {
//     let filteredClasses = responseObj.filter(function (availableClass) {
//       return (
//         availableClass["Хичээлийн_хуваарь_тавих_боломж"] != "Хуваарь тавих боломжгүй" &&
//         availableClass["Хичээлийн_байр"] == bairVariable
//       );
//     });

//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('filtered',true);

//     const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
//     window.history.pushState({path: newUrl}, '', newUrl);

//     const classSection1HTMLArray = filteredClasses.map((classObj) => {
//       const classI = new ClassSec(classObj);
//       return classI.Render();
//     });

//     const classSection1HTML = classSection1HTMLArray.reduce(
//       (prev, current) => prev + current
//     );
//     document.getElementById("class-section1").innerHTML = classSection1HTML;
//     console.log(filteredClasses);
//   });
// }


//-----------------------------------------ODOR-LIST---------------------------------------------------------------

const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".calendar-icons span");

const calendarTopFilter = document.querySelectorAll(".button-list li");
const tsagGrid = document.querySelectorAll(".tsag-list li");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth()+1;
let today = date.getDate();

let startDay=today;
let endDay=today;
let startTsag="07:40";
let endTsag="21:45";

let firstSelectedDay = null;
let lastSelectedDay = null;

firstSelectedDay = null;
lastSelectedDay = null;

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

   let day = document.querySelectorAll(".days li");


   day.forEach(dayTag => {
      dayTag.addEventListener("click", () => {
          if (!firstSelectedDay && !dayTag.classList.contains("inactive")) {
              firstSelectedDay = dayTag;
              firstSelectedDay.classList.add("day-active");
              startDay = firstSelectedDay.innerText;
          } else if (!lastSelectedDay && !dayTag.classList.contains("inactive")) {
              lastSelectedDay = dayTag;
              lastSelectedDay.classList.add("day-active");
              endDay = lastSelectedDay.innerText;
            
              const firstIndex = [...day].indexOf(firstSelectedDay);
              const lastIndex = [...day].indexOf(lastSelectedDay);
   
              const minIndex = Math.min(firstIndex, lastIndex);
              const maxIndex = Math.max(firstIndex, lastIndex);
   
              for (let i = minIndex + 1; i < maxIndex; i++) {
                  day[i].classList.add("day-active");
              }
              document.getElementById("odor-info").innerText = `${currMonth}/${startDay} - ${currMonth}/${endDay}`;
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
              startDay = firstSelectedDay.innerText;
          }
      });
   });
   
}
renderCalendar();

   

prevNextIcon.forEach(icon => {
   today = 0;
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

calendarTopFilter.forEach(tsag => {
   tsag.addEventListener("click", ()=>{
      let a = date.getDate();
      firstSelectedDay = a;
      if (tsag.innerText == "1 өдөр"){
         lastSelectedDay = a;
      } else if (tsag.innerText == "7 хоног"){
         lastSelectedDay = a+7;
      } else if (tsag.innerText == "2-7 хоног"){
         lastSelectedDay = a+14;
      }
      document.getElementById("odor-info").innerText = `${firstSelectedDay} - ${lastSelectedDay}`;
   });
});

//--------------------------------------TSAG-LIST--------------------------------------------------------------------------

let firstSelectedTsag = null;
let lastSelectedTsag = null;
tsagGrid.forEach(tsag =>{
   tsag.addEventListener("click", ()=>{
      if (!firstSelectedTsag && !tsag.classList.contains("inactive")) {
         firstSelectedTsag = tsag;
         startTsag = tsag.innerText;

         firstSelectedTsag.classList.add("tsag-active");
     } else if (!lastSelectedTsag && !tsag.classList.contains("inactive")) {
      lastSelectedTsag = tsag;
      endTsag = tsag.innerText;
      lastSelectedTsag.classList.add("tsag-active");
       
         const firstIndex = [...tsagGrid].indexOf(firstSelectedTsag);
         const lastIndex = [...tsagGrid].indexOf(lastSelectedTsag);

         const minIndex = Math.min(firstIndex, lastIndex);
         const maxIndex = Math.max(firstIndex, lastIndex);

         for (let i = minIndex + 1; i < maxIndex; i++) {
             tsagGrid[i].classList.add("tsag-active");
         }
         document.getElementById("tsag-info").innerText = `${startTsag} - ${endTsag}`;
     } else if (tsag.classList.contains("inactive")){
          //nothing;
     } else {
         // Reset selection if both first and last selected days are already set
         firstSelectedTsag.classList.remove("tsag-active");
         lastSelectedTsag.classList.remove("tsag-active");
         tsagGrid.forEach(tag => {
            tag.classList.remove("tsag-active");
         });
         firstSelectedTsag = tsag;
         startTsag = tsag.innerText;
         lastSelectedTsag = null;
         tsag.classList.add("tsag-active");
     }
   });
});

//--------------------------------------HUWAARI-FETCH & CONVERSION-------------------------------------------------------------------
function fetching() {
fetch("https://api.npoint.io/144f8502239edcab18c5")
  .then((response) => response.json())
  .then((initialData) => {
    // console.log(initialData );

    const groupByUruuniiDugaar = (data) => {
      const groupedData = {};
      data.forEach((item) => {
        const { uruunii_khuviin_dugaar, garag, ekhlekh_tsag, duusakh_tsag } =
          item;
        if (!groupedData[uruunii_khuviin_dugaar]) {
          groupedData[uruunii_khuviin_dugaar] = [];
        }
        groupedData[uruunii_khuviin_dugaar].push({
          garag,
          ekhlekh_tsag,
          duusakh_tsag,
        });
      });
      return groupedData;
    };

    // Function to convert grouped data to the desired structure
    const convertToDesiredStructure = (groupedData) => {
      const result = [];
      for (const uruunii_khuviin_dugaar in groupedData) {
        result.push({
          uruunii_khuviin_dugaar,
          khicheeliin_tsag: groupedData[uruunii_khuviin_dugaar],
        });
      }
      return result;
    };

    // Group the data by "uruunii_khuviin_dugaar"
    const groupedByUruuniiDugaar = groupByUruuniiDugaar(initialData);
    // Convert the grouped data to the desired structure
    const huwaariArray = convertToDesiredStructure(groupedByUruuniiDugaar);

    let calculatingDate = new Date(currYear,currMonth-1,startDay);
    let garagOfDate = calculatingDate.getDay();

    const weekdays = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
    const weekdayName = weekdays[garagOfDate];


//     const filteredClassesSet = new Set();

//     huwaariArray.forEach(element => {
//       for (let i = 0; i < element.khicheeliin_tsag.length; i++) {
//           if (element.khicheeliin_tsag[i].garag === weekdayName) {
//               filteredClassesSet.add(element.uruunii_khuviin_dugaar);
//           }
//       }
//   });


    const tsag= timeStringToN(endTsag) - timeStringToN(startTsag);

    huwaariArray.forEach(element => {
      const AInMinutes = element.khicheeliin_tsag.map(slot => ({
         start: convertToMinutes(slot.ekhlekh_tsag),
         end: convertToMinutes(slot.duusakh_tsag)
     })); 

     console.log(AInMinutes);
     const BStart = convertToMinutes(startTsag);
     const BEnd = convertToMinutes(endTsag);
     const C = [];

     for (let i = BStart; i <= BEnd; i++) {
      let isInA = false;
      for (let j = 0; j < AInMinutes.length; j++) {
          if (i >= AInMinutes[j].start && i <= AInMinutes[j].end) {
              isInA = true;
              break;
          }
      }
      if (!isInA) {
          C.push(convertToTimeStamp(i));
      }
      }
      // console.log(C);
      });

    console.log(huwaariArray);
  }); 

}
// ----------------------------------BAIR-BUTTON-LISTENERS----------------------------------------------------------------------


  bairbtn.addEventListener("click", ()=>{
    if(bairlist.classList.contains("open"))
       bairlist.classList.remove("open");
    else {
       bairlist.classList.add("open");
       tsaglist.classList.remove("open");
       calendarlist.classList.remove("open-flex");
    }
 });
 
 calendarbtn.addEventListener('click',() => {
   if(calendarlist.classList.contains("open-flex")){
       calendarlist.classList.remove("open-flex");
   } else{
       calendarlist.classList.add("open-flex");
       tsaglist.classList.remove("open");
       bairlist.classList.remove("open");
   }
 });
 
 tsagbtn.addEventListener("click", () => {
    if(tsaglist.classList.contains("open")){
       tsaglist.classList.remove("open");
    } else{ 
       tsaglist.classList.add("open");
       bairlist.classList.remove("open");
       calendarlist.classList.remove("open-flex");
    }
 });

 searchButton.addEventListener("click", () => {
    console.log(`${bairVariable} / (${startDay} - ${endDay}) / ${startTsag} - ${endTsag}`);
    bairlist.classList.remove("open");
    tsaglist.classList.remove("open");
    calendarlist.classList.remove("open-flex");

    fetching();
 });

// -------------------------------ADDITIONAL-FUNCTIONS-----------------------------------------------------------------------

 function timeStringToN(timeString){
   const [hoursStr, minutesStr] = timeString.split(':');

   const hours = parseInt(hoursStr, 10);
   const minutes = parseInt(minutesStr, 10);

   const totalMinutes = hours * 60 + minutes;
   return totalMinutes;
 }

 const convertToMinutes = (timeStr) => {
   const [hoursStr, minutesStr] = timeStr.split(':');
   return parseInt(hoursStr, 10) * 60 + parseInt(minutesStr, 10);
};

const convertToTimeStamp = (minutes) => {
   const hours = Math.floor(minutes / 60);
   const mins = minutes % 60;
   return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};
import ClassSec from "./ClassSection.js";

// let bairVariable = "Хичээлийн төв байр";
// fetchData();

// document.getElementById('bair-1').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн төв байр";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-2').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн байр 2";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-4').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн байр 4";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-5').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн байр 5";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-7').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн байр 3А";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-8').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн байр 8";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-e-lib').addEventListener('click',() =>{
//   bairVariable = "E-Номын сан";
//   fetchData();
//   bairlist.classList.remove("open");
// });
// document.getElementById('bair-huuli').addEventListener('click',() =>{
//   bairVariable = "Хичээлийн байр 3Б";
//   fetchData();
//   bairlist.classList.remove("open");
// });

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

// fetch("https://sisi.num.edu.mn/digital_num/api/package/hicheeliin-huvaari")
// .then (response => response.json())
// .then (responseObj =>{
//     console.log(responseObj);
// });

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
    const desiredStructure = convertToDesiredStructure(groupedByUruuniiDugaar);

    console.log(desiredStructure);
  });

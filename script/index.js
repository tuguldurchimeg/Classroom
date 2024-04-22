import ClassSec from "./ClassSection.js";

// const usp = new URLSearchParams(document.location.search);
// let filterValue = usp.get("Хичээлийн_хуваарь_тавих_боломж");

// fetch("https://api.npoint.io/70107af397f4a981c076")
//   .then((response) => response.json())
//   .then((responseObj) => {
//     const jsonData = responseObj;
//     let filteredClasses = jsonData.filter(function (availableClass) {
//       return (
//         availableClass["Хичээлийн_хуваарь_тавих_боломж"] != "Хуваарь тавих боломжгүй" &&
//         availableClass["Хичээлийн_байр"] != "Багш оюутны хөгжлийн төв" &&
//         availableClass["Хичээлийн_байр"] != "Дорнод сургуулийн хичээлийн байр" &&
//         availableClass["Хичээлийн_байр"] != "Завхан сургуулийн хичээлийн байр" &&
//         availableClass["Хичээлийн_байр"] != "Цөмийн судалгааны төв" &&
//         availableClass["Хичээлийн_байр"] != "Ховд сургуулийн хичээлийн 1-р байр" &&
//         availableClass["Хичээлийн_байр"] != "Ховд сургуулийн хичээлийн 2-р байр" &&
//         availableClass["Хичээлийн_байр"] != "Орхон сургуулийн хичээлийн байр" &&
//         availableClass["Өрөөний_зориулалт"] != "Биеийн тамирын зал "
//       );
//     });

//     const classSection1HTMLArray = filteredClasses.map((classObj) => {
//       const classI = new ClassSec(classObj);
//       return classI.Render();
//     });

//     const classSection1HTML = classSection1HTMLArray.reduce(
//       (prev, current) => prev + current
//     );

//     // for (let classSection1 of filteredClasses) {
//     //   classSection1HTML += `
//     //       <a href="class.html" class="class-section-1">
//     //         <article>
//     //           <img
//     //             src="styles/assets/class.jpg"
//     //             alt="classroom-picture"
//     //             class="image"
//     //           />
//     //           <div class="text-wrapper">
//     //             <h3>
//     //               ${classSection1.Хичээлийн_байр.slice(-2)} - ${
//     //     classSection1.Өрөөний_дугаар
//     //   }
//     //             </h3>
//     //             <img
//     //               src="styles/assets/Heart-grey.svg"
//     //               alt="like this class"
//     //               class="heart-grey"
//     //             />
//     //             <div class="class-type">${classSection1.Өрөөний_зориулалт}</div>
//     //             <div class="class-info">
//     //               <div class="seat-count">${classSection1.Суудлын_тоо}</div>
//     //               ${
//     //                 classSection1.Проектортой_эсэх === "Проектортой"
//     //                   ? '<div class="projector proj-on"></div>'
//     //                   : '<div class="projector proj-off"></div>'
//     //               }
//     //             </div>
//     //           </div>
//     //         </article>
//     //       </a>
//     //   `;
//     // }

//     document.getElementById("class-section1").innerHTML = classSection1HTML;
//     console.log(filteredClasses);
//   });


  let bairVariable = "Хичээлийн төв байр";
  fetchData();

  document.getElementById('bair-1').addEventListener('click',() =>{
    bairVariable = "Хичээлийн төв байр";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-2').addEventListener('click',() =>{
    bairVariable = "Хичээлийн байр 2";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-4').addEventListener('click',() =>{
    bairVariable = "Хичээлийн байр 4";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-5').addEventListener('click',() =>{
    bairVariable = "Хичээлийн байр 5";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-7').addEventListener('click',() =>{
    bairVariable = "Хичээлийн байр 3А";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-8').addEventListener('click',() =>{
    bairVariable = "Хичээлийн байр 8";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-e-lib').addEventListener('click',() =>{
    bairVariable = "E-Номын сан";
    fetchData();
    bairlist.classList.remove("open");
  });
  document.getElementById('bair-huuli').addEventListener('click',() =>{
    bairVariable = "Хичээлийн байр 3Б";
    fetchData();
    bairlist.classList.remove("open");
  });

  function fetchData() {
    fetch("https://api.npoint.io/70107af397f4a981c076")
    .then((response) => response.json())
    .then((responseObj) => {
      let filteredClasses = responseObj.filter(function (availableClass) {
        return (
          availableClass["Хичээлийн_хуваарь_тавих_боломж"] != "Хуваарь тавих боломжгүй" &&
          availableClass["Хичээлийн_байр"] == bairVariable
        );
      });

      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('filtered',true);

      const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
      window.history.pushState({path: newUrl}, '', newUrl);


      const classSection1HTMLArray = filteredClasses.map((classObj) => {
        const classI = new ClassSec(classObj);
        return classI.Render();
      });

      const classSection1HTML = classSection1HTMLArray.reduce(
        (prev, current) => prev + current
      );
      document.getElementById("class-section1").innerHTML = classSection1HTML;
      console.log(filteredClasses);
    });
  }

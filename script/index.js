let classSection1HTML = "";

fetch('https://api.npoint.io/70107af397f4a981c076')
.then(response => response.json())
.then(responseObj => {
   const jsonData = responseObj;

   var filteredClasses = jsonData.filter(function (availableClass) {
      return availableClass['Хичээлийн_хуваарь_тавих_боломж'] != "Хуваарь тавих боломжгүй";
   });

   for (let classSection1 of filteredClasses){
      classSection1HTML +=`
      <a href="class.html" class="class-section-1">
            <article>
              <img
                src="styles/assets/class.jpg"
                alt="classroom-picture"
                class="image"
              />
              <div class="text-wrapper">
                <h3>${classSection1.Өрөөний_дугаар}</h3>
                <img
                  src="styles/assets/Heart-grey.svg"
                  alt="like this class"
                  class="heart-grey"
                />
                <div class="class-type">${classSection1.Өрөөний_зориулалт}</div>
                <div class="class-info">
                  <div class="seat-count">${classSection1.Суудлын_тоо}</div>
                  <div class="projector"></div>
                </div>
              </div>
            </article>
          </a>
      `
   }

   document.getElementById("class-section1").innerHTML = classSection1HTML;
   console.log(filteredClasses.length);
});






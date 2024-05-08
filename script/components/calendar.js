class Calendar extends HTMLElement {
  constructor() {
    super();
    // this.Render();
    this.date = new Date();
    this.today = this.date.getDate();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth() + 1;

    this.type = 2;
  }

  Render() {
    return `
      <div class="calendar-icons">
        <span id="prev">&#8249;</span>
        <p class="current-date"></p>
        <span id="next">&#8250;</span>
      </div>
      <div class="calendar">
        <ul class="weeks">
          <li>Ня</li>
          <li>Да</li>
          <li>Мя</li>
          <li>Лх</li>
          <li>Пү</li>
          <li>Ба</li>
          <li>Бя</li>
        </ul>
        <ul class="days">
        </ul>
      </div>`;
  }

  connectedCallback() {
    this.innerHTML = this.Render();

    let startDay = this.today;
    let endDay = this.today;
    let firstSelectedDay = null;
    let lastSelectedDay = null;

    let currDate = document.querySelector(".current-date"),
      daysTag = document.querySelector(".days"),
      prevNextIcon = document.querySelectorAll(".calendar-icons span");

    let firstDayOfMonth = new Date(
      this.currYear,
      this.currMonth - 1,
      1
    ).getDay(); // Subtract 1 from this.currMonth
    let lastDateOfMonth = new Date(this.currYear, this.currMonth, 0).getDate(); // No need to add 1 to this.currMonth here
    let lastDayOfMonth = new Date(
      this.currYear,
      this.currMonth - 1,
      lastDateOfMonth
    ).getDay(); // Subtract 1 from this.currMonth
    let lastDateofLastMonth = new Date(
      this.currYear,
      this.currMonth - 1,
      0
    ).getDate(); // Subtract 1 from this.currMonth

    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      if (i < this.today) {
        liTag += `<li class="inactive">${i}</li>`;
      } else {
        liTag += `<li>${i}</li>`;
      }
    }
    for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currDate.innerText = `${this.currMonth}-р сар ${this.currYear}`;
    daysTag.innerHTML = liTag;

    let day = document.querySelectorAll(".days li");
    day.forEach((dayTag) => {
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
          if (this.type == 1)
            document.getElementById(
              "odor-info"
            ).innerText = `${this.currMonth}/${startDay} - ${this.currMonth}/${endDay}`;
        } else if (dayTag.classList.contains("inactive")) {
          //nothing;
        } else {
          // Reset selection if both first and last selected days are already set
          firstSelectedDay.classList.remove("day-active");
          lastSelectedDay.classList.remove("day-active");
          day.forEach((tag) => {
            tag.classList.remove("day-active");
          });
          firstSelectedDay = dayTag;
          lastSelectedDay = null;
          dayTag.classList.add("day-active");
          startDay = firstSelectedDay.innerText;
        }
      });
    });

    prevNextIcon.forEach((icon) => {
      this.today = 0;
      icon.addEventListener("click", () => {
        this.currMonth =
          icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;

        if (this.currMonth < 1) {
          this.currYear--;
          this.currMonth = 12; // Set to December
        } else if (this.currMonth > 12) {
          this.currYear++;
          this.currMonth = 1; // Set to January
        }

        this.Render();
      });
    });
  }

  disconnectedCallback() {
    //implementation
  }

  attributeChangedCallback(name, oldVal, newVal) {
    //implementation
  }

  adoptedCallback() {
    //implementation
  }
}

window.customElements.define("calendar-cm", Calendar);

class Calendar extends HTMLElement {
  constructor() {
    super();
    this.date = new Date();
    this.today = this.date.getDate();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth(); // 0-based month

    this.type = this.getAttribute("type-clndr");
    this.isNextMonthVisible = false;
    this.startDay = this.today;
    this.endDay = this.today + 7;
  }

  Render() {
    const monthNames = [
      "1-р сар",
      "2-р сар",
      "3-р сар",
      "4-р сар",
      "5-р сар",
      "6-р сар",
      "7-р сар",
      "8-р сар",
      "9-р сар",
      "10-р сар",
      "11-р сар",
      "12-р сар",
    ];

    return `
      <div class="calendar-icons">
        <span id="prev" ${
          this.isNextMonthVisible ? "" : 'style="display:none"'
        }>&#8249;</span>
        <span id="next" ${
          this.isNextMonthVisible ? 'style="display:none"' : ""
        }>&#8250;</span>
      </div>
      <div class="calendar">
        <div id="month-current" class="month" style="${
          this.isNextMonthVisible ? "display:none" : "display:block"
        };">
          ${this.generateMonthHtml(this.currYear, this.currMonth)}
        </div>
        <div id="month-next" class="month" style="${
          this.isNextMonthVisible ? "display:block" : "display:none"
        };">
          ${this.generateMonthHtml(this.currYear, this.currMonth + 1)}
        </div>
      </div>
      <div id="odor-info"></div>`;
  }

  generateMonthHtml(year, month) {
    if (month > 11) {
      // handle next year
      month -= 12;
      year += 1;
    }

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    const monthNames = [
      "1-р сар",
      "2-р сар",
      "3-р сар",
      "4-р сар",
      "5-р сар",
      "6-р сар",
      "7-р сар",
      "8-р сар",
      "9-р сар",
      "10-р сар",
      "11-р сар",
      "12-р сар",
    ];

    let liTag = "";

    // Add the last days of the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Add all days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      if (month === this.date.getMonth() && i < this.today) {
        liTag += `<li class="inactive">${i}</li>`;
      } else {
        liTag += `<li>${i}</li>`;
      }
    }

    // Calculate and add the first days of the next month
    const totalDays = firstDayOfMonth + lastDateOfMonth;
    const daysInWeek = 7;
    const remainingDays = daysInWeek - (totalDays % daysInWeek);
    for (let i = 1; i <= remainingDays && remainingDays < daysInWeek; i++) {
      liTag += `<li class="inactive">${i}</li>`;
    }

    return `
      <div class="month-header">
        <p class="current-date">${monthNames[month]} ${year}</p>
      </div>
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
        ${liTag}
      </ul>`;
  }

  connectedCallback() {
    this.innerHTML = this.Render();

    this.firstSelectedDay = null;
    this.lastSelectedDay = null;

    this.daysTag = document.querySelectorAll(".days");
    this.prevNextIcon = document.querySelectorAll(".calendar-icons span");

    this.attachDayClickEvents();
    this.attachNavEvents();
    this.updateOdorInfo();
  }

  attachDayClickEvents() {
    this.daysTag.forEach((tag) => {
      let dayTags = tag.querySelectorAll("li");
      dayTags.forEach((dayTag) => {
        dayTag.addEventListener("click", () => {
          if (
            !this.firstSelectedDay &&
            !dayTag.classList.contains("inactive")
          ) {
            this.firstSelectedDay = dayTag;
            this.firstSelectedDay.classList.add("day-active");
            this.startDay = parseInt(this.firstSelectedDay.innerText);
            this.endDay = this.startDay + 7;
            this.updateOdorInfo();
          } else if (
            !this.lastSelectedDay &&
            !dayTag.classList.contains("inactive")
          ) {
            this.lastSelectedDay = dayTag;
            this.lastSelectedDay.classList.add("day-active");
            this.endDay = parseInt(this.lastSelectedDay.innerText);
            this.updateRange();
            this.updateOdorInfo();
          } else if (dayTag.classList.contains("inactive")) {
            // nothing
          } else {
            // Reset selection if both first and last selected days are already set
            this.resetSelection();
            this.firstSelectedDay = dayTag;
            dayTag.classList.add("day-active");
            this.startDay = parseInt(this.firstSelectedDay.innerText);
            this.endDay = this.startDay + 7;
            this.updateOdorInfo();
          }
        });
      });
    });
  }

  attachNavEvents() {
    this.prevNextIcon.forEach((icon) => {
      icon.addEventListener("click", () => {
        this.isNextMonthVisible = icon.id === "next";
        this.toggleMonthVisibility();
      });
    });
  }

  toggleMonthVisibility() {
    document.getElementById("month-current").style.display = this
      .isNextMonthVisible
      ? "none"
      : "block";
    document.getElementById("month-next").style.display = this
      .isNextMonthVisible
      ? "block"
      : "none";
    document.querySelector("#prev").style.display = this.isNextMonthVisible
      ? "inline"
      : "none";
    document.querySelector("#next").style.display = this.isNextMonthVisible
      ? "none"
      : "inline";
    document.querySelector(".current-date").innerText = this.isNextMonthVisible
      ? this.getNextMonthName()
      : this.getCurrentMonthName();
  }

  getCurrentMonthName() {
    const monthNames = [
      "1-р сар",
      "2-р сар",
      "3-р сар",
      "4-р сар",
      "5-р сар",
      "6-р сар",
      "7-р сар",
      "8-р сар",
      "9-р сар",
      "10-р сар",
      "11-р сар",
      "12-р сар",
    ];
    return `${monthNames[this.currMonth]} ${this.currYear}`;
  }

  getNextMonthName() {
    const monthNames = [
      "1-р сар",
      "2-р сар",
      "3-р сар",
      "4-р сар",
      "5-р сар",
      "6-р сар",
      "7-р сар",
      "8-р сар",
      "9-р сар",
      "10-р сар",
      "11-р сар",
      "12-р сар",
    ];
    const nextMonth = (this.currMonth + 1) % 12;
    const nextYear = this.currMonth === 11 ? this.currYear + 1 : this.currYear;
    return `${monthNames[nextMonth]} ${nextYear}`;
  }

  updateRange() {
    const allDays = Array.from(document.querySelectorAll(".days li"));
    const firstIndex = allDays.indexOf(this.firstSelectedDay);
    const lastIndex = allDays.indexOf(this.lastSelectedDay);

    const minIndex = Math.min(firstIndex, lastIndex);
    const maxIndex = Math.max(firstIndex, lastIndex);

    for (let i = minIndex + 1; i < maxIndex; i++) {
      allDays[i].classList.add("day-active");
    }
  }

  resetSelection() {
    if (this.firstSelectedDay)
      this.firstSelectedDay.classList.remove("day-active");
    if (this.lastSelectedDay)
      this.lastSelectedDay.classList.remove("day-active");
    document.querySelectorAll(".days li").forEach((tag) => {
      tag.classList.remove("day-active");
    });
    this.firstSelectedDay = null;
    this.lastSelectedDay = null;
  }

  dayUpdate() {
    const event = new CustomEvent("dayChanged", {
      bubbles: true,
      detail: {
        startMonth: this.currMonth + 1,
        startDay: this.startDay,
        endMonth: this.currMonth + 1,
        endDay: this.endDay,
      },
    });
    this.dispatchEvent(event);
  }

  updateOdorInfo() {
    const startMonth = this.currMonth + 1;
    const endMonth = this.currMonth + 1;
    document.getElementById(
      "odor-info"
    ).innerText = `${startMonth}/${this.startDay} - ${endMonth}/${this.endDay}`;
    this.dayUpdate();
  }
}

window.customElements.define("calendar-cm", Calendar);

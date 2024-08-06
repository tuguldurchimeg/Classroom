class TimesContainer extends HTMLElement {
  constructor() {
    super();
    this.room_id;
    this.date;
    this.times;
    this.selected_times = new Set();
  }
  #Render() {
    const usp = new URLSearchParams(document.location.search);
    const classObj = JSON.parse(usp.get("id"));
    this.room_id = classObj.roomID;
    // Get month day ( Get slot times by date START )
    document.addEventListener("dayChanged", async (event) => {
      try {
        let { startMonth, startDay } = event.detail;
        const currentDate = new Date();
        const selectedDate = new Date(
          currentDate.getFullYear(),
          startMonth - 1,
          startDay + 1
        );
        this.date = selectedDate.toISOString().split("T")[0];
        const dayResponse = await fetch(
          `http://localhost:3000/times/${encodeURIComponent(
            this.room_id
          )}/${encodeURIComponent(this.date)}`
        );

        const dayData = await dayResponse.json();
        console.log("all_times: ", dayData);
        this.all_times = dayData.times;
        const timeBtnsHTML = this.all_times.map((timeObj) => {
          return `<btn-time time = ${timeObj.time} status = ${timeObj.status}></btn-time n-time>`;
        });
        this.innerHTML = timeBtnsHTML.join("");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
  }

  selectedTime(time) {
    if (this.selected_times.has(time)) {
      this.selected_times.delete(time);
    } else {
      this.selected_times.add(time);
    }
    console.log(this.selected_times);
  }
}

window.customElements.define("available-times", TimesContainer);

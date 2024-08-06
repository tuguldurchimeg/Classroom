import ClassFormatter from "../script/ClassFormatter.js";

class BtnTime extends HTMLElement {
  constructor() {
    super();
    this.time = this.getAttribute("time");
    this.stat = this.getAttribute("status");
    this.clicked = false;
  }
  #Render() {
    const formatter = new ClassFormatter();
    return `
    <li>
        <button style="background: var(--color-${
          this.clicked ? "primary" : "background"
        }" class="timeBtn">
        <time datetime="16:00">${formatter.formatTime(this.time)}</time>
        </button>
    </li>`;
  }
  connectedCallback() {
    this.innerHTML = this.#Render();
    this.addEventListener("click", () => {
      this.clicked = this.clicked ? false : true;
      const times_container = document.querySelector(".day-times");
      times_container.selectedTime(this.time);
      this.innerHTML = this.#Render();
    });
  }
}

window.customElements.define("btn-time", BtnTime);

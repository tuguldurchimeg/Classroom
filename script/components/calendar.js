class Calendar extends HTMLElement {
  constructor() {
    super();
    //implementation
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
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="days">
        </ul>
      </div>`;
  }

  connectedCallback() {
    this.innerHTML = this.Render();
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

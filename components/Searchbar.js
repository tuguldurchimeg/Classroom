class Searchbar extends HTMLElement {
  constructor() {
    super();
    this.bairNum = "2-р байр";
  }

  handleClick() {
    const event = new CustomEvent("searched", {
      bubbles: true,
      detail: {
        bair: this.bairNum,
        startMonth: this.startMonth,
        startDay: this.startDay,
        endMonth: this.endMonth,
        endDay: this.endDay,
        startTsag: this.startTsag,
        endTsag: this.endTsag,
      },
    });
    this.dispatchEvent(event);
  }

  Render() {
    return `
      <bair-list class="bair"></bair-list>
      <img src="styles/assets/Line.svg" alt="none" class="line-svg" />
      <li class="odor">
        <button id="calendar-button">
          <span>Өдөр</span>
          <time id="odor-info" class="light-grey"></time>
        </button>
        <div class="calendar-box" id="calendar-list">
          <calendar-cm class="calendar-wrapper"></calendar-cm>
        </div>
      </li>
      <img src="styles/assets/Line.svg" alt="none" class="line-svg" />
      <li class="tsag">
        <button id="tsag-button">
          <span>Цаг</span>
          <time id="tsag-info" class="light-grey">07:40 - 19:20</time>
        </button>
        <tsag-lister></tsag-lister>
      </li>
      <li class="search-button-background" id="search">
        <button class="search-button">
          <img src="styles/assets/Search-button.svg" alt="search" />
        </button>
      </li>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.Render();

    customElements.whenDefined("tsag-lister").then(() => {
      const bairBtn = this.querySelector("#bair-button");
      const bairList = this.querySelector(".bair-list");
      const calendarbtn = this.querySelector("#calendar-button");
      const calendarlist = this.querySelector("#calendar-list");
      const tsagbtn = this.querySelector("#tsag-button");
      const tsaglist = this.querySelector("#tsag-list");
      const searchButton = this.querySelector(".search-button");

      searchButton.addEventListener("click", this.handleClick.bind(this));

      bairBtn.addEventListener("click", () => {
        bairList.classList.toggle("open");
      });

      calendarbtn.addEventListener("click", () => {
        calendarlist.classList.toggle("open-flex");
      });

      tsagbtn.addEventListener("click", () => {
        tsaglist.classList.toggle("open");
      });

      document.addEventListener("bairChanged", (event) => {
        const bairBtn = this.querySelector("#bair-button");
        const bairList = this.querySelector(".bair-list");
        bairBtn.addEventListener("click", () => {
          bairList.classList.toggle("open");
        });
        const { bairNum } = event.detail;
        this.bairNum = bairNum;
      });
      document.addEventListener("dayChanged", (event) => {
        const { startMonth } = event.detail;
        const { startDay } = event.detail;
        const { endMonth } = event.detail;
        const { endDay } = event.detail;
        this.startMonth = startMonth;
        this.startDay = startDay;
        this.endMonth = endMonth;
        this.endDay = endDay;
      });
      document.addEventListener("tsagChanged", (event) => {
        const { startTsag } = event.detail;
        const { endTsag } = event.detail;
        this.startTsag = startTsag;
        this.endTsag = endTsag;
      });
    });
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {}

  adoptedCallback() {}
}

window.customElements.define("search-bar", Searchbar);

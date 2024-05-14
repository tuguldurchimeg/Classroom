class BairList extends HTMLElement {
  constructor() {
    super();
  }

  #Render(bair) {
    return `
      <button id="bair-button">
        <span>Хичээлийн байр</span>
        <span class="light-grey">${bair}</span>
      </button>
      <ul class="bair-list">
        <single-bair bairId="1"></single-bair>
        <single-bair bairId="2"></single-bair>
        <single-bair bairId="4"></single-bair>
        <single-bair bairId="5"></single-bair>
        <single-bair bairId="7"></single-bair>
        <single-bair bairId="8"></single-bair>
        <single-bair bairId="9"></single-bair>
        <single-bair bairId="10"></single-bair>
      </ul>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render("2-р байр"); // Default value
    // Listen for custom event dispatched from single-bair
    document.addEventListener("bairChanged", (event) => {
      const { bairNum } = event.detail;
      this.innerHTML = this.#Render(bairNum); // Update bair list with new value
    });
  }
}

window.customElements.define("bair-list", BairList);

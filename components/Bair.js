class Bair extends HTMLElement {
  constructor() {
    super();

    // Bind event listener
    this.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    // Dispatch custom event when clicked
    const event = new CustomEvent("bairChanged", {
      bubbles: true,
      detail: {
        bairNum: this.bairNum,
      },
    });
    this.dispatchEvent(event);
  }

  Render() {
    return `
      <button>
        <img src="styles/assets/class.jpg" alt="classroom-picture" />
      </button>
      <span>${this.bairNum}</span>
    `;
  }

  connectedCallback() {
    // Set bairNum based on bairId
    switch (this.getAttribute("bairId")) {
      case "1":
        this.bairNum = "1-р байр";
        break;
      case "2":
        this.bairNum = "2-р байр";
        break;
      case "4":
        this.bairNum = "4-р байр";
        break;
      case "5":
        this.bairNum = "5-р байр";
        break;
      case "7":
        this.bairNum = "7-р байр";
        break;
      case "8":
        this.bairNum = "8-р байр";
        break;
      case "9":
        this.bairNum = "E-Lib";
        break;
      case "10":
        this.bairNum = "Хууль зүй";
        break;
      default:
        this.bairNum = "2-р байр"; // Default value
        break;
    }
    this.innerHTML = this.Render();
  }
}

window.customElements.define("single-bair", Bair);

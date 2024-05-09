class bair extends HTMLElement {
  constructor() {
    super();

    //  let bairNumb = this.getAttribute("bairNum");
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
        this.bairNum = "2-р байр";
        break;
    }

    this.bairId = this.getAttribute("bairId");
  }

  #Render() {
    return `
      <button bairId = "${this.bairId}">
        <img src="styles/assets/class.jpg" alt="classroom-picture" />
      </button>
      <span>${this.bairNum}</span>
    `;
  }

  changeBair() {
    const listofbair = document.querySelector("bair-list");
    listofbair.changeBair(this.bairNum);
    //  const event = new Event("BairTitleChanged", { bubbles: true });
    //  this.dispatchEvent(event);
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
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

window.customElements.define("single-bair", bair);

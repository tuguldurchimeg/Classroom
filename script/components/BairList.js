class bairList extends HTMLElement {
  constructor() {
    super();
    //  document.getElementById("bair-1").addEventListener("click", () => {
    //    this.set.bairVar("1");
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "1-р байр";
    //  });
    //  document.getElementById("bair-2").addEventListener("click", () => {
    //    bairVariable = "2";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "2-р байр";
    //  });
    //  document.getElementById("bair-4").addEventListener("click", () => {
    //    bairVariable = "4";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "4-р байр";
    //  });
    //  document.getElementById("bair-5").addEventListener("click", () => {
    //    bairVariable = "5";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "5-р байр";
    //  });
    //  document.getElementById("bair-7").addEventListener("click", () => {
    //    bairVariable = "3А";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "3А-р байр";
    //  });
    //  document.getElementById("bair-8").addEventListener("click", () => {
    //    bairVariable = "8";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "8-р байр";
    //  });
    //  document.getElementById("bair-e-lib").addEventListener("click", () => {
    //    bairVariable = "E-Lib";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "E-Номын сан";
    //  });
    //  document.getElementById("bair-huuli").addEventListener("click", () => {
    //    bairVariable = "3Б";
    //    bairlist.classList.remove("open");
    //    document.getElementById("bair-info").innerText = "3Б-р байр";
    //  });

    this.bair = "2-р байр";
  }
  #Render() {
    return `
      <button id="bair-button">
        <span>Хичээлийн байр</span>
        <span class="light-grey" id="bair-info">${this.bair}</span>
      </button>
      <ul class="bair-list" id="bair-list">
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
  changeBair(value) {
    this.bair = value;
    this.innerHTML = this.#Render();
  }

  set bairVar(bairniiDugaar) {
    this.bair = bairniiDugaar;
    this.#Render();
  }
  get bairVar() {
    return this.bair;
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

window.customElements.define("bair-list", bairList);

class Filter extends HTMLElement {
  constructor() {
    super();
    this.type = this.getAttribute("type");
  }
  #Render() {}

  connectedCallback() {
    //implementation
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

window.customElements.define("filter", Filter);

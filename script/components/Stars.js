class Stars extends HTMLElement {
  constructor() {
    super();
    this.totalStars = 5;
    this.type = this.getAttribute("tp");
    this.rating;
    this.hover;

    this.setRating = (rate) => (this.rating = rate);
    this.setHover = (hv) => (this.hover = hv);
  }
  #Render() {
    const stars = [...Array(this.totalStars)].map((star, index) => {
      const currentRating = index + 1;
      return `<star-rating tp=${this.type}></star-rating>`;
    });
    return stars;
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

window.customElements.define("stars-rating", Stars);

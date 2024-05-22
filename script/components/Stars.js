class Stars extends HTMLElement {
  constructor() {
    super();
    this.totalStars = 5;
    this.type = this.getAttribute("tp");
    this.rating = 0;
  }
  #Render() {
    const stars = this.setStarsMap();
    return `<span style="color: var(--color-text)">${this.rating}</span>
            ${stars}`;
  }
  connectedCallback() {
    this.innerHTML = this.#Render();
  }
  setRating = (rate) => {
    this.rating = rate;
    this.innerHTML = this.#Render();
  };
  setStarsMap = () => {
    return [...Array(this.totalStars)]
      .map((star, index) => {
        const currentRating = index + 1;
        return `<star-rating color = ${
          currentRating <= this.rating
            ? "var(--color-primary)"
            : "var(--color-border)"
        }" tp=${this.type} val=${currentRating}></star-rating>`;
      })
      .reduce((prev, current) => prev + current);
  };

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

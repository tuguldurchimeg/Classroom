class Star extends HTMLElement {
  constructor() {
    super();
    this.value = this.getAttribute("val");
    this.type = this.getAttribute("tp");
    this.color = this.getAttribute("color");
  }
  #Render() {
    return `
        <label>
            <input
            type="radio"
            name="rating"
            value=${this.value}
            />
            <span class="star" style="color: ${this.color}">
              &#9733;
            </span>
        </label>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
    this.addEventListener("click", (event) => {
      const stars = document.getElementById(`${this.type}`);
      stars.setRating(this.value);
    });
    this.addEventListener("mouseenter", function () {
      const stars = document.getElementById(`${this.type}`);
      stars.setRating(this.value);
    });
  }
}

window.customElements.define("star-rating", Star);

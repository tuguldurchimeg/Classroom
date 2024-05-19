class Stars extends HTMLElement {
  constructor() {
    super();
    this.totalStars = this.getAttribute("starsNum");
    this.rating;
    this.hover;

    this.setRating = (rate) => this.rating = rate;
    this.setHover = (hv) => this.hover = hv;
  }
  #Render() {
    return [...Array(this.totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (this.hover! || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() =>
                setRating(currentRating != null ? currentRating : null)
              }
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
    })
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

window.customElements.define("stars", Stars);

class ClassSection extends HTMLElement {
  constructor() {
    super();
    this.build = this.getAttribute("build");
    this.roomNo = this.getAttribute("roomNo");
    this.roomID = this.getAttribute("roomID");
    this.type = this.getAttribute("type");
    this.capac = this.getAttribute("cap");
    this.proj = this.getAttribute("proj");
    this.rating = 0; // Initialize rating to a default value
  }

  Render() {
    const encodedData = encodeURIComponent(JSON.stringify(this));

    const ratingStars = [...Array(5)]
      .map((_, index) => {
        return index < this.rating
          ? `<i class="fa-solid fa-star" style="color: var(--color-primary); font-size: 0.8em;"></i>`
          : `<i class="fa-regular fa-star" style="color: var(--color-light-grey); font-size: 0.8em;"></i>`;
      })
      .join("");

    return `<a href="class.html?id=${encodedData}" class="class-section-1">
            <article>
              <img
                src="../styles/assets/class.jpg"
                alt="classroom-picture"
                class="image"
              />
              <div class="text-wrapper">
                <div class="class-head-ttl">
                    <h3>
                    ${this.build} - 
                    ${this.roomNo}
                    </h3>
                  <btn-like roomId=${this.roomID}></btn-like>
                </div>
                <div class="class-type">${this.type}</div>
                <div class="class-info">
                  <div class="seat-count">${this.capac}</div>
                  ${
                    this.proj === "Проектортой"
                      ? '<div class="projector proj-on"></div>'
                      : '<div class="projector proj-off"></div>'
                  }
                </div>
                <div> 
                ${ratingStars}
                </div>
              </div>
            </article>
          </a>`;
  }

  connectedCallback() {
    this.innerHTML = this.Render();
    this.getRating();
  }

  getRating() {
    fetch(`http://localhost:3000/rating/${this.roomID}`)
      .then((response) => response.json())
      .then((data) => {
        this.rating = data.avgRate;
        this.innerHTML = this.Render(); // Re-render with the updated rating
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }
}

window.customElements.define("class-section", ClassSection);

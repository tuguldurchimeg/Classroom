class ClassSection extends HTMLElement {
  constructor() {
    super();
    this.data = JSON.parse(decodeURIComponent(this.getAttribute("data")));
    this.schedule = this.data.schedule;
  }
  Render() {
    const encodedData = encodeURIComponent(JSON.stringify(this.data));

    return `<a href="class.html?id=${encodedData}" class="class-section-1">
              <article>
                <img
                  src="styles/assets/class.jpg"
                  alt="classroom-picture"
                  class="image"
                />
                <div class="text-wrapper">
                  <h3>
                    ${this.data.building} - 
                    ${this.data.roomNo}
                  </h3>
                  <img
                    src="styles/assets/Heart-grey.svg"
                    alt="like this class"
                    class="heart-grey"
                  />
                  <div class="class-type">${this.data.type}</div>
                  <div class="class-info">
                    <div class="seat-count">${this.data.capacity}</div>
                    ${
                      this.data.projector === "Проектортой"
                        ? '<div class="projector proj-on"></div>'
                        : '<div class="projector proj-off"></div>'
                    }
                  </div>
                </div>
              </article>
            </a>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.Render();
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

window.customElements.define("class-section", ClassSection);

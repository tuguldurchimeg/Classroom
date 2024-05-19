class ClassSection extends HTMLElement {
  constructor() {
    super();
    this.build = this.getAttribute("build");
    this.roomNo = this.getAttribute("roomNo");
    this.roomID = this.getAttribute("roomID");
    this.type = this.getAttribute("type");
    this.capac = this.getAttribute("cap");
    this.proj = this.getAttribute("proj");
    this.schedule = this.getAttribute("sched");

    this.liked = false;
  }
  Render() {
    const encodedData = encodeURIComponent(JSON.stringify(this));
    let i = Math.floor(Math.random() * 10000) + 1;
    return `<a href="class.html?id=${encodedData}" class="class-section-1">
            <article>
              <img
                src="https://source.unsplash.com/random/400x250/?classroom,lesson&${i}"
                alt="classroom-picture"
                class="image"
              />
              <div class="text-wrapper">
                <div class="class-head-ttl">
                    <h3>
                    ${this.build} - 
                    ${this.roomNo}
                  </h3>
                  <btn-like roomId=${encodedData}></btn-like>
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
              </div>
            </article>
          </a>
      `;
  }
  Liked() {}

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

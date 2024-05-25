class Cart extends HTMLElement {
  constructor() {
    super();
    this.likedClasses = new Map();
  }
  #Render() {
    if (this.likedClasses != null) {
      let temp = Array.from(this.likedClasses.values())
        .map((classL) => {
          return `<class-section 
              build=${classL.build} 
              roomNo=${classL.roomNo} 
              roomID=${classL.roomID}
              type=${classL.type}
              cap=${classL.capac}
              proj=${classL.proj}
              sched=${classL.schedule}
          > </class-section>`;
        })
        .reduce((prev, current) => prev + current, "");
      return temp;
    }
    return "";
  }

  LikedClass(classData) {
    let t = JSON.parse(decodeURIComponent(classData));
    if (this.likedClasses.has(t.roomID)) {
      this.likedClasses.delete(t.roomID);
    } else {
      this.likedClasses.set(t.roomID, t);
    }
    this.innerHTML = this.#Render();
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

window.customElements.define("cart-class", Cart);

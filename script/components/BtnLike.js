class BtnLike extends HTMLElement {
  constructor() {
    super();
    this.liked = "";
    this.roomId = this.getAttribute("roomId");
  }
  #Render() {
    return ` 
    <style> 
        .heart-grey{
          color: var(--color-primary);
        }
        input{
          display: none;
        }
    </style>
    
    ${
      this.liked == "checked"
        ? '<i class="fa-solid fa-heart heart-grey"></i>'
        : '<i class="fa-regular fa-heart heart-grey"></i>'
    }
            
    `;
  }
  Liked() {}

  connectedCallback() {
    this.innerHTML = this.#Render();
    // a
    this.addEventListener("click", (event) => {
      event.preventDefault();
      this.liked = this.liked == "checked" ? "" : "checked";
      const cart = document.querySelector(".verified");
      this.innerHTML = this.#Render();
    });
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

window.customElements.define("btn-like", BtnLike);

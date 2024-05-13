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
    this.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("hjfdkshdkl");
      this.liked == "checked" ? (this.liked = "") : (this.liked = "checked");
      this.#Render();
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

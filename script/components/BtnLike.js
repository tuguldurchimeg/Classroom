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
    <label> 
            ${
              this.liked == "checked"
                ? '<i class="fa-solid fa-heart heart-grey"></i>'
                : '<i class="fa-regular fa-heart heart-grey"></i>'
            }
            <input type="checkbox" ${this.liked}>
    </label>
    `;
  }
  Liked() {}

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

window.customElements.define("btn-like", BtnLike);

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
          font-size: 1.3em;
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
      const cart = document.querySelector(".test");
      cart.LikedClass(this.roomId);

      const profile = document.getElementById("profile-comp");
      if (this.liked == "checked") profile.newNotif();
      else profile.readNotif();
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

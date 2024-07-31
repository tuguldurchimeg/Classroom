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
          color: var(--color-border);
          font-size: 1.3em;
          &:hover{
            color: var(--color-primary);
          }
        }
    </style>
    
    ${
      this.liked == "checked"
        ? '<i class="fa-solid fa-heart heart-grey" style="color: var(--color-primary)"></i>'
        : '<i class="fa-regular fa-heart heart-grey"></i>'
    }
            
    `;
  }
  Liked() {}

  connectedCallback() {
    this.innerHTML = this.#Render();
    // a
    this.addEventListener("click", async (event) => {
      event.preventDefault();
      this.liked = this.liked == "checked" ? "" : "checked";
      if (this.liked == "checked") {
        this.liked = "";
        try {
          const response = await fetch(`http:://localhost:3000/liked`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              room_id: this.roomId,
            }),
          });
        } catch (error) {
          console.log("Error: ", error.message);
        }
      }
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

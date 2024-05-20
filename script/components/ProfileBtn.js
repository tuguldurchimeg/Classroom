class ProfileBtn extends HTMLElement {
  constructor() {
    super();
    this.countNotif = 0;
  }

  #Render() {
    return `
          <button class="pop-up-btn" id="profile-btn">
              <i class="fa-regular fa-user"></i>
              <i id="notif" class="${this.countNotif !== 0 ? "open" : ""}">${
      this.countNotif !== 0 ? this.countNotif : ""
    }</i>
          </button>
      `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
    this.addEventListener("click", () => {
      const userPopUp = document.getElementById("user-popup");
      if (userPopUp.classList.contains("open")) {
        userPopUp.classList.remove("open");
      } else {
        userPopUp.classList.add("open");
      }
      this.innerHTML = this.#Render();
    });
  }

  newNotif() {
    this.countNotif++;
    const not = this.querySelector("#notif");
    not.textContent = this.countNotif;
    not.classList.add("open");
  }
  readNotif() {
    this.countNotif--;
    const not = this.querySelector("#notif");
    not.textContent = this.countNotif;
    if (this.countNotif == 0) not.classList.remove("open");
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

window.customElements.define("profile-btn", ProfileBtn);

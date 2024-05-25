class PopUpUser extends HTMLElement {
  constructor() {
    super();
    //implementation
  }
  #Render() {
    return `<ul>
              <li>
                  <span class="button" id="user-login">Нэвтрэх</span>
              </li>
              <li>
                  <a href="user.html" class="reserved-menu menu"><span>Захиалсан ангиуд</span></a>
              </li>
              <li>
                  <a href="user.html" class="liked-menu menu"><span>Дуртай ангиуд</span></a>
              </li>
              <li>
                  <a href="contact.html" class="contact-menu menu"><span>Холбогдох</span></a>
              </li>
            </ul>
    `;
  }
  connectedCallback() {
    this.innerHTML = this.#Render();
    this.querySelector("#user-login").addEventListener("click", () => {
      const userPopUp = document.querySelector("#login-pop-up");
      if (userPopUp.classList.contains("open")) {
        userPopUp.classList.remove("open");
      } else {
        userPopUp.classList.add("open");
      }
    });
  }
}

window.customElements.define("pop-up-user", PopUpUser);

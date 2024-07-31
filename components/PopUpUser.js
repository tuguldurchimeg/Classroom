import authenticateToken from "../userAuth.mjs";
class PopUpUser extends HTMLElement {
  constructor() {
    super();
  }

  #Render(userData) {
    if (userData) {
      return `<ul>
                <li>
                    <span class="button" id="user-login">${userData.email}</span>
                </li>
                <li>
                    <a href="contact.html" class="contact-menu menu"><span>Холбогдох</span></a>
                </li>
              </ul>`;
    } else {
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
              </ul>`;
    }
  }

  connectedCallback() {
    const userData = getUserFromLocalStorage();
    this.innerHTML = this.#Render(userData);

    // Open login popup on user login button click
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

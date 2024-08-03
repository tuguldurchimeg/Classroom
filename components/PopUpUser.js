class PopUpUser extends HTMLElement {
  constructor() {
    super();
  }

  #Render(user) {
    return `<ul>
                ${
                  user
                    ? `<li>
                      <span class="button" id="user-login">${user.email}</span>
                  </li>
                  <li>
                      <a href="user.html" class="reserved-menu menu"><span>Захиалсан ангиуд</span></a>
                  </li>
                  <li>
                      <a href="user.html" class="liked-menu menu"><span>Дуртай ангиуд</span></a>
                  </li>`
                    : `<li>
                          <span class="button" id="user-login">Нэвтрэх</span>
                      </li>`
                }          
                  <li>
                      <a href="contact.html" class="contact-menu menu"><span>Холбогдох</span></a>
                  </li>
                ${
                  user
                    ? `
                  <li>
                    <a href="#" class="logout-menu menu"><span>Гарах</span></a>
                  </li>`
                    : ``
                }
            </ul>`;
  }

  connectedCallback() {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        this.#handleInvalidToken();
      } else {
        this.#fetchUserProfile(token);
      }
    } else {
      this.#handleInvalidToken();
    }
  }

  #handleInvalidToken() {
    console.error("Invalid or expired token");
    this.innerHTML = this.#Render(null);
    this.login();
  }

  #fetchUserProfile(token) {
    fetch("http://localhost:3000/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      )
      .then((profile) => {
        const user = profile ? profile.user : null;
        this.innerHTML = this.#Render(user);
        this.login();
        this.logout();
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        this.innerHTML = this.#Render(null);
        this.login();
      });
  }

  login() {
    this.querySelector("#user-login").addEventListener("click", () => {
      const userPopUp = document.querySelector("#login-pop-up");
      if (userPopUp.classList.contains("open")) {
        userPopUp.classList.remove("open");
      } else {
        userPopUp.classList.add("open");
      }
    });
  }

  logout() {
    const logoutBtn = this.querySelector(".logout-menu");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        alert("Log out success");
        // Optionally, re-render to show the login option
        this.innerHTML = this.#Render(null);
        this.login();
      });
    }
  }
}

window.customElements.define("pop-up-user", PopUpUser);

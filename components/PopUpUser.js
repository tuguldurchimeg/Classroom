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
            </ul>`;
  }

  connectedCallback() {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((profileResponse) => {
          if (profileResponse.ok) {
            return profileResponse.json();
          } else {
            console.error(
              "Failed to fetch profile:",
              profileResponse.statusText
            );
            return null;
          }
        })
        .then((profile) => {
          let user = profile.user;
          this.innerHTML = this.#Render(user);
          this.addLoginButtonEventListener();
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          this.innerHTML = this.#Render(null);
          this.addLoginButtonEventListener();
        });
    } else {
      console.error("No token found in localStorage");
      this.innerHTML = this.#Render(null);
      this.addLoginButtonEventListener();
    }
  }

  addLoginButtonEventListener() {
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

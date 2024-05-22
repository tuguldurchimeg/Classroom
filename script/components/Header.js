class Header extends HTMLElement {
  constructor() {
    super();
  }
  #Render() {
    return `
        <nav>
            <a href="index.html" class="header-logo">
            <img class="logo" src="styles/assets/Logo.svg" />
            </a>
            <search-bar class="search-bar"></search-bar>

            <profile-btn id="profile-comp"></profile-btn>
            <pop-up-user class="pop-up-user"></pop-up-user>
            <pop-up-login class="pop-up" id="login-pop-up"></pop-up-login>
        </nav>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
  }
}

window.customElements.define("main-header", Header);

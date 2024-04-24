class MobileNav extends HTMLElement {
  constructor() {
    super();
    //implementation
  }
  Render() {
    return `<ul>
    <li><a href="index.html"><img src="styles/assets/Logo.svg" alt="Home"></a></li>
    <li><a href="user.html"><img src="styles/assets/Navbar-heart.svg" alt="Liked Classes"></a></li>
    <li><a href="user.html"><img src="styles/assets/Waiting.svg" alt="Zahialguud"></a></li>
    <li><a href="user.html"><img src="styles/assets/Navbar-profile.svg" alt="Profile"></a></li>
 </ul>`;
  }

  connectedCallback() {
    this.innerHTML = this.Render();
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

window.customElements.define("mobile-nav", MobileNav);

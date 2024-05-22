class MobileNav extends HTMLElement {
  constructor() {
    super();
    //implementation
  }
  Render() {
    return `
    <ul>
    <li><a href="index.html"><img src="styles/assets/Logo.svg" alt="Home"></a></li>
    <li><a href="user.html"><i class="fa-regular fa-heart" style="font-size: 1.5rem; color: var(--color-text)"></i></a></li>
    <li><a href="user.html"><i class="fa-regular fa-file-lines" style="font-size: 1.5rem; color: var(--color-text)"></i></a></li>
    <li><a href="user.html"><profile-btn></profile-btn></a></li>
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

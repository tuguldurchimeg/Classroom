class UserPopUp extends HTMLElement {
  constructor() {
    super();
    //implementation
  }
  Render() {
    return `
    <ul>
      <li>
          <a href="user.html" class="button">Нэвтрэх</a>
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

window.customElements.define("pop-up-user", UserPopUp);

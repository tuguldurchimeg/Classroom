class MobileNav extends HTMLElement {
  constructor() {
    super();
  }

  Render() {
    return `
      <style>
        a {
          text-decoration: none;
          color: var(--color-text);
        }
        a.active {
          color: var(--color-primary);
        }
      </style>
      <ul>
        <li><a href="index.html"><img src="styles/assets/Logo.svg" alt="Home"></a></li>
        <li><a href="user.html?user-menu=liked"><i class="fa-regular fa-heart" style="font-size: 1.5rem;"></i></a></li>
        <li><a href="user.html?user-menu=reservations"><i class="fa-regular fa-file-lines" style="font-size: 1.5rem;"></i></a></li>
        <li><a href="user.html?user-menu=account"><profile-btn></profile-btn></a></li>
      </ul>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.Render();
    this.highlightActiveLink();
  }

  highlightActiveLink() {
    const links = this.querySelectorAll("a");
    const currentUrl = window.location.href;

    links.forEach((link) => {
      if (link.href === currentUrl) {
        link.classList.add("active");
      }
    });
  }
}

window.customElements.define("mobile-nav", MobileNav);

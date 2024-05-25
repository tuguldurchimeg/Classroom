class PopUpLogin extends HTMLElement {
  constructor() {
    super();
  }
  #Render() {
    return `
        <div class="popup-inner">
            <button id="close-login"><i class="fa-solid fa-xmark" ></i></button>
            <header>
                <h1 class="heading-5">Нэвтрэх</h1>
            </header>
            <p>@stud.num.edu.mn мэйлээрээ нэвтэрч орж бүртгэлээ баталгаажуулаарай</p>
            <div>
                <label for="email">Цахим шуудан</label>
                <input type="email" id="email" pattern=".+@stud.num.edu\.com" size="30" placeholder="21B1NUM1402@stud.num.edu.mn" required />
            </div>
            <button class="btn-login">Нэвтрэх</button>
        </div>
    `;
  }
  connectedCallback() {
    this.innerHTML = this.#Render();
    this.querySelector("#close-login").addEventListener("click", () => {
      this.classList.remove("open");
    });
  }
}

window.customElements.define("pop-up-login", PopUpLogin);

import { useAuth } from "../src_private/authprovider.mjs";

class PopUpLogin extends HTMLElement {
  constructor() {
    super();
  }

  #Render() {
    return `
        <div class="popup-inner">
            <button id="close-login"><i class="fa-solid fa-xmark"></i></button>
            <div class="log-option"> 
              <input type="radio" class="tablink" id="log-btn" name="log-btns" checked>
              <label for="log-btn" id="log-btn-lbl">Нэвтрэх</label>
              <div class="logcontent">  
                <div>
                    <label for="email-reg">Цахим шуудан</label>
                    <input type="email" id="email" size="30" placeholder="21B1NUM1402@stud.num.edu.mn" required />
                </div>
                <div>
                    <label for="password">Нууц үг</label>
                    <input type="password" id="password"  size="30" placeholder="Нууц үг" required />
                </div>
                <button class="btn-login" onclick="this.login">Нэвтрэх</button>
              </div>
            </div>
            <div class="log-option"> 
              <input type="radio" class="tablink" id="reg-btn" name="log-btns">
              <label for="reg-btn" id="reg-btn-lbl">Бүртгүүлэх</label>
              <div class="logcontent"> 
                  <div>
                      <label for="email">Цахим шуудан</label>
                      <input type="email" id="email-reg" size="30" placeholder="21B1NUM1402@stud.num.edu.mn" required />
                  </div>
                  <div>
                      <label for="telPhone">Утас</label>
                      <input type="tel" id="telPhone"  placeholder="Утасны дугаар" required />
                  </div>
                  <div>
                      <label for="password-reg">Нууц үг</label>
                      <input type="password" id="password-reg"  size="30" placeholder="Нууц үг" required />
                  </div>
                  <button class="btn-add-reg" onclick="this.handleReg">Бүртгэл үүсгэх</button>
              </div>
            </div>
        </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
    this.querySelector("#close-login").addEventListener("click", () => {
      this.classList.remove("open");
    });
    // You can attach event listeners after rendering the HTML
    this.querySelector(".btn-login").addEventListener("click", this.login);
    this.querySelector(".btn-add-reg").addEventListener(
      "click",
      this.handleReg
    );
  }

  login() {
    console.log("logged");
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    // If useAuth is a custom hook, make sure it's imported correctly and used here
    // const auth = useAuth();

    if (email !== "" && pass !== "") {
      // auth.loginAction(email, pass);
      console.log("Authenticating...");
      return;
    }
    alert("Нэвтрэх нэр, нууц үгээ оруулна уу!");
  }

  async handleReg() {
    console.log("Registering...");
    const email = document.getElementById("email-reg").value;
    const pass = document.getElementById("password-reg").value;
    const phone = document.getElementById("telPhone").value;

    try {
      const response = await fetch(`http://localhost:3000/reg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: pass,
          phone: phone,
          email: email,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    alert("Бүртгэл амжилттай нэвтэрнэ үү!");
  }
}

window.customElements.define("pop-up-login", PopUpLogin);

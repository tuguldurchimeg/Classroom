import ClassRen from "../../script/ClassRender.js";
import { RenderClass } from "./render-class.js";

class ClassComponent extends HTMLElement {
  constructor() {
    super();
    this.token;
    this.renderData = this.renderData.bind(this);
  }

  connectedCallback() {
    this.renderData();
  }

  async renderData() {
    this.token = localStorage.getItem("token");
    if (!this.token || this.#isTokenExpired()) {
      alert("Энэ үйлдлийг хийхийн тулд нэвтэрч орно уу!");
      window.location.href = "index.html"; // Redirect to the home page
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const userMenu = urlParams.get("user-menu"); // get which menu it is 'user-menu'

    let container = this.querySelector(".content-container");
    if (!container) {
      container = document.createElement("section");
      container.classList.add("content-container");
    } else {
      container.innerHTML = ""; // Clear the existing content
    }

    switch (userMenu) {
      case "reservations":
        await this.renderReservations(container);
        break;
      case "liked":
        await this.renderLikedClasses(container);
        break;
      case "account":
        await this.renderAccountProfile(container);
        break;
      default:
        console.error("Invalid user menu");
    }

    this.appendChild(container);
  }

  async renderReservations(container) {
    container.classList.add("reservations");

    const verifiedHeader = document.createElement("h1");
    verifiedHeader.classList.add("reservations-status");
    verifiedHeader.textContent = "Баталгаажсан:";
    container.appendChild(verifiedHeader);

    const verifiedHTML = document.createElement("section");
    container.appendChild(verifiedHTML);

    const waitingHeader = document.createElement("h1");
    waitingHeader.classList.add("reservations-status");
    waitingHeader.textContent = "Хүлээгдэж буй:";
    container.appendChild(waitingHeader);

    const waitingHTML = document.createElement("section");
    container.appendChild(waitingHTML);

    await this.fetchReservationsData(verifiedHTML, waitingHTML);
  }

  async fetchReservationsData(verifiedHTML, waitingHTML) {
    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      const createNodeFromString = (htmlString) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString.trim();
        return tempDiv.firstChild;
      };

      jsonData.reservations
        .filter((item) => item.status === "verified")
        .map((item) => new RenderClass(item).render_class_list())
        .forEach((htmlString) => {
          const node = createNodeFromString(htmlString);
          if (node instanceof Node) {
            verifiedHTML.appendChild(node);
          }
        });

      jsonData.reservations
        .filter((item) => item.status === "waiting")
        .map((item) => new RenderClass(item).render_class_list())
        .forEach((htmlString) => {
          const node = createNodeFromString(htmlString);
          if (node instanceof Node) {
            waitingHTML.appendChild(node);
          }
        });
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }

  async renderLikedClasses(container) {
    container.classList.add("liked-classes");

    try {
      const response = await fetch("http://localhost:3000/liked", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      const jsonData = await response.json();

      const likedClassesHTML = jsonData.liked_rooms
        .map((item) => {
          const classObj = new ClassRen(item);
          return classObj.Render();
        })
        .join("");
      container.innerHTML = likedClassesHTML;
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }

  async renderAccountProfile(container) {
    container.classList.add("account");
    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const profile = await response.json();
      const user = profile ? profile.user : null;

      if (user) {
        // Create email label
        const emailLabel = document.createElement("label");
        emailLabel.textContent = `${user.email}`;
        container.appendChild(emailLabel);

        // Create current password input
        const currentPasswordInput = document.createElement("input");
        currentPasswordInput.type = "password";
        currentPasswordInput.placeholder = "Хуучин нууц үг";
        currentPasswordInput.id = "current-password";
        container.appendChild(currentPasswordInput);

        // Create new password input
        const newPasswordInput = document.createElement("input");
        newPasswordInput.type = "password";
        newPasswordInput.placeholder = "Шинэ нууц үг";
        newPasswordInput.id = "new-password";
        container.appendChild(newPasswordInput);

        // Create confirm password input
        const confirmPasswordInput = document.createElement("input");
        confirmPasswordInput.type = "password";
        confirmPasswordInput.placeholder = "Шинэ нууц үг давтах";
        confirmPasswordInput.id = "confirm-password";
        container.appendChild(confirmPasswordInput);

        // Create submit button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Нууц үг солих";
        container.appendChild(submitButton);

        // Add event listener to submit button
        submitButton.addEventListener("click", async () => {
          const currentPassword = currentPasswordInput.value;
          const newPassword = newPasswordInput.value;
          const confirmPassword = confirmPasswordInput.value;

          if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
          }

          try {
            const response = await fetch(
              "http://localhost:3000/auth/change-password",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  currentPassword: currentPassword,
                  newPassword: newPassword,
                }),
              }
            );

            if (!response.ok) {
              throw new Error(response.statusText);
            }

            alert("Password changed successfully");
          } catch (error) {
            console.error("Error changing password:", error);
            alert("Error changing password");
          }
        });
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  #isTokenExpired() {
    const payload = JSON.parse(atob(this.token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  }
}

window.customElements.define("class-component", ClassComponent);

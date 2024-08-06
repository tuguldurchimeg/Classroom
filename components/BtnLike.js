class BtnLike extends HTMLElement {
  constructor() {
    super();
    this.roomId = this.getAttribute("roomId");
    this.liked = "";
  }

  Render() {
    return `
    <style> 
        .heart-grey {
          color: var(--color-border);
          font-size: 1.3em;
        }

        .heart-grey:hover {
          color: var(--color-primary);
        }
    </style>
    
    ${
      this.liked === "checked"
        ? '<i class="fa-solid fa-heart heart-grey" style="color: var(--color-primary)"></i>'
        : '<i class="fa-regular fa-heart heart-grey"></i>'
    }
    `;
  }

  connectedCallback() {
    this.checkIfLiked().then(() => {
      this.innerHTML = this.Render();
    });

    this.addEventListener("click", (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");

      if (!token || this.#isTokenExpired(token)) {
        alert("Энэ үйлдлийг хийхийн тулд нэвтэрч орно уу!");
      } else {
        this.liked = this.liked === "checked" ? "" : "checked";
        this.toggleLike().then(() => {
          const profile = document.getElementById("profile-comp");
          if (profile) {
            if (this.liked === "checked") {
              profile.newNotif();
            } else {
              profile.readNotif();
            }
          }
          this.innerHTML = this.Render();
        });
      }
    });
  }

  async checkIfLiked() {
    const token = localStorage.getItem("token");

    if (!token || this.#isTokenExpired(token)) {
      this.liked = "";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/liked/${this.roomId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch like status.");
        return;
      }

      const data = await response.json();
      this.liked = data.length === 0 ? "" : "checked";
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  async toggleLike() {
    const token = localStorage.getItem("token");

    if (!token || this.#isTokenExpired(token)) {
      alert("Please login to continue");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/liked", {
        method: this.liked === "checked" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room_id: this.roomId,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update like status.");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  #isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      console.error("Failed to decode token:", e);
      return true; // Treat any error as an expired token
    }
  }
}

window.customElements.define("btn-like", BtnLike);

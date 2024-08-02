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
    });
  }

  async checkIfLiked() {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:3000/liked/${this.roomId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch like status.");
          return {};
        }
      })
      .then((data) => {
        this.liked = data.length == 0 ? "" : "checked";
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }

  async toggleLike() {
    const token = localStorage.getItem("token");
    return fetch("http://localhost:3000/liked", {
      method: this.liked === "checked" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        room_id: this.roomId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to update like status.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }
}

window.customElements.define("btn-like", BtnLike);

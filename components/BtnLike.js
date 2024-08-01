class BtnLike extends HTMLElement {
  constructor() {
    super();
    this.roomId = this.getAttribute("roomId");
    this.liked = "";
  }

  #Render() {
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
      this.liked == "checked"
        ? '<i class="fa-solid fa-heart heart-grey" style="color: var(--color-primary)"></i>'
        : '<i class="fa-regular fa-heart heart-grey"></i>'
    }
    `;
  }

  async checkIfLiked() {
    const token = localStorage.getItem("token");
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

      if (response.ok) {
        const data = await response.json();
        this.liked = data && Object.keys(data).length > 0 ? "checked" : "";
        console.log(this.liked);
      } else {
        console.error("Failed to fetch like status.");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
    this.innerHTML = this.#Render();
  }

  connectedCallback() {
    this.checkIfLiked();

    this.addEventListener("click", async (event) => {
      event.preventDefault();
      this.liked = this.liked == "checked" ? "" : "checked";
      if (this.liked == "checked") {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch("http://localhost:3000/liked", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              room_id: this.roomId,
            }),
          });

          if (response.ok) {
            const data = await response.json();
          } else {
            console.error("Failed to update like status.");
          }
        } catch (error) {
          console.log("Error: ", error.message);
        }
      }

      const profile = document.getElementById("profile-comp");
      if (profile) {
        if (this.liked == "checked") profile.newNotif();
        else profile.readNotif();
      }
      this.innerHTML = this.#Render();
    });
  }
}

window.customElements.define("btn-like", BtnLike);

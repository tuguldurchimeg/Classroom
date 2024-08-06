class BtnCancel extends HTMLElement {
  constructor() {
    super();
    this.res_id = this.getAttribute("res_id");
    this.render();
  }

  async handleClick(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/reservations/${this.res_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      // Optionally, remove the element from the DOM
      this.closest("article.class-section-2").remove();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  render() {
    this.innerHTML = `
            <button class="cancel-btn">
              <img src="styles/assets/cancal.png" alt="cancel">
            </button>
        `;

    this.querySelector(".cancel-btn").addEventListener("click", (event) =>
      this.handleClick(event)
    );
  }
}

window.customElements.define("btn-cancel", BtnCancel);

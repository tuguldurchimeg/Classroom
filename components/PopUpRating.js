class RatingPopUp extends HTMLElement {
  constructor() {
    super();
    this.closePop = () => {
      this.classList.remove("open");
    };
  }

  #Render() {
    return `
      <style>      
        input[type="radio"] {
          display: none;
        }
        .star {
          color: var(--color-border);
          font-size: 2rem;
        }
        .star:hover {
          color: var(--color-primary);
        }
      </style>
      <div class="popup-inner">
        <button id="close-rating"><i class="fa-solid fa-xmark"></i></button>
        <header>
          <h5 class="rate-title-p">Үнэлгээ</h5>
        </header>
        <div class="rate-crits">
          <span>Агааржуулалт</span>
          <stars-rating id="air" tp="air"></stars-rating>
        </div>
        <div class="rate-crits">
          <span>NUM-Wifi</span>
          <stars-rating id="wifi" tp="wifi"></stars-rating>
        </div>
        <div class="rate-crits">
          <span>Тохижилт</span>
          <stars-rating id="inter" tp="inter"></stars-rating>
        </div>
        <div class="rate-crits">
          <span>Залгуур</span>
          <stars-rating id="slot" tp="slot"></stars-rating>
        </div>
        <button class="post-rate">Нэмэх</button>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
    this.querySelector("#close-rating").addEventListener(
      "click",
      this.closePop
    );
    this.querySelector(".post-rate").addEventListener("click", async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to submit a rating.");
        return;
      }

      const usp = new URLSearchParams(document.location.search);
      const classObj = JSON.parse(usp.get("id"));

      const ratingData = {
        id: "8",
        room_id: classObj.roomID,
        air_rate: parseInt(document.getElementById("air").rating, 10),
        wifi_rate: parseInt(document.getElementById("wifi").rating, 10),
        slot_rate: parseInt(document.getElementById("slot").rating, 10),
        comfort_rate: parseInt(document.getElementById("inter").rating, 10),
      };

      console.log("Sending rating data:", ratingData);

      try {
        const response = await fetch("http://localhost:3000/rating", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ratingData),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const data = await response.json();
          console.error("Server error:", data);
          throw new Error(data.message);
        }

        const data = await response.json();
        alert("Rating submitted successfully!");
        console.log("Rating response:", data);
      } catch (error) {
        console.error("Error submitting rating:", error);
        alert("Failed to submit rating. Please try again.");
      }
    });
  }
}

window.customElements.define("pop-up-rating", RatingPopUp);

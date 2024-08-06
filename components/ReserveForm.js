class ReserveForm extends HTMLElement {
  constructor() {
    super();
  }
  Render() {
    return `
      <form class="reserve-form">
          <ul>
              <li>
                  <label class="purpose-label" for="purpose">Ашиглах зорилго</label>
                  <select class="form-attr purpose" name="purpose" required>
                      <option value="клуб">Клубын уулзалт</option>
                      <option value="хурал">Хурал, цуглаан</option>
                      <option value="сургалт">Сургалт, давтлага</option>
                      <option value="хичээл">Хичээл хийх</option>
                      <option value="чөлөөт">Урлагийн наадам</option>
                  </select>
              </li>
              <li>
                  <label class="description-label" for="description">Нэмэлт тайлбар</label>
                  <div><textarea class="form-attr description" name="description" cols="50" rows="10" required></textarea></div>
              </li>
              <ul>
                  <li class="people">
                      <label class="people-label" for="people">Хэдэн хүн?</label>
                      <div><input class="form-attr people-input" type="number" name="people" max="50" min="2" required></div>
                  </li>
                  <li class="phone-number1">
                      <label class="phone-label" for="phone1">Утас 1</label>
                      <div><input class="form-attr phone-input" type="tel" name="phone1" pattern="[0-9]{4}[0-9]{4}" required></div>
                  </li>
                  <li class="phone-number2">
                      <label class="phone-label" for="phone2">Утас 2</label>
                      <div><input class="form-attr phone-input" type="tel" name="phone2" pattern="[0-9]{4}[0-9]{4}" required></div>
                  </li>
              </ul>       
          </ul>
          <button class="submit" type="submit">Захиалах</button>
        </form>
    `;
  }

  async handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const reservation_details = {};

    formData.forEach((value, key) => {
      reservation_details[key] = value;
    });

    const timesContainer = document.querySelector("available-times");
    const { room_id, date, selected_times } = timesContainer;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room_id: room_id,
          date: date,
          times: Array.from(selected_times), // Convert Set to Array
          details: reservation_details,
        }), // Convert req_body to JSON string
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  connectedCallback() {
    this.innerHTML = this.Render();
    this.querySelector("form").addEventListener(
      "submit",
      this.handleSubmit.bind(this)
    );
  }
}

window.customElements.define("reserve-form", ReserveForm);

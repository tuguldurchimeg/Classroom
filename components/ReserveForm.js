class ReserveForm extends HTMLElement {
  constructor() {
    super();
    //implementation
  }
  Render() {
    return `
        <ul>
            <li>
                <label for="purpose1">Ашиглах зорилго</label>
                  <select class="form-attr" name="purpose" id="purpose1" required>
                      <option value="клуб">Клубын уулзалт</option>
                      <option value="хурал">Хурал, цуглаан</option>
                      <option value="сургалт">Сургалт, давтлага</option>
                      <option value="хичээл">Хичээл хийх</option>
                      <option value="чөлөөт">Урлагийн наадам</option>
                  </select>
            </li>
            <li>
                <label for="description2">Нэмэлт тайлбар</label>
                <div><textarea class="form-attr" id="description2" name="description" cols="50" rows="10" required></textarea></div>
            </li>
            <ul>
                <li class="people">
                    <label for="people1">Хэдэн хүн?</label>
                    <div><input class="form-attr" type="number" name="people" max="50" min="2" required></div>
                </li>
                <li class="phone-number1">
                    <label for="phone-number1">Утас 1</label>
                    <div><input class="form-attr" type="tel" name="phone" pattern="[0-9]{4}-[0-9]{4}" required></div>
                </li>
                <li class="phone-number2">
                    <label for="phone-number2">Утас 2</label>
                    <div><input class="form-attr" type="tel" name="phone" pattern="[0-9]{4}-[0-9]{4}" required></div>
                </li>
            </ul>       
        </ul>
        <button class="submit" type="submit">Захиалах</button>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.Render();
  }

  disconnectedCallback() {
    //implementation
  }

  attributeChangedCallback(name, oldVal, newVal) {
    //implementation
  }

  adoptedCallback() {
    //implementation
  }
}

window.customElements.define("reserve-form", ReserveForm);

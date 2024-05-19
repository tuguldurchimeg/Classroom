class RatingPopUp extends HTMLElement {
  constructor() {
    super();
    //implementation
  }
  #Render() {
    return `
                <header>
                    <h5 class="rate-title-p">Үнэлгээ</h5>
                </header>
                <div class="rate-crits">
                    <span>Агааржуулалт</span>
                    <div class="star-wid">
                        <input type="radio" name="rate" id="rate-1">
                        <label for="rate-1" class="star" src></label>
                        <input type="radio" name="rate" id="rate-2">
                        <label for="rate-2" class="star"></label>
                        <input type="radio" name="rate" id="rate-3">
                        <label for="rate-3" class="star"></label>
                        <input type="radio" name="rate" id="rate-4">
                        <label for="rate-4" class="star"></label>
                        <input type="radio" name="rate" id="rate-5">
                        <label for="rate-5" class="star"></label>
                    </div>
                </div>
                <div class="rate-crits">
                    <span>NUM-Wifi</span>
                    <div class="star-wid">
                        <input type="radio" name="rate" id="rate-1">
                        <label for="rate-1" class="star" src></label>
                        <input type="radio" name="rate" id="rate-2">
                        <label for="rate-2" class="star"></label>
                        <input type="radio" name="rate" id="rate-3">
                        <label for="rate-3" class="star"></label>
                        <input type="radio" name="rate" id="rate-4">
                        <label for="rate-4" class="star"></label>
                        <input type="radio" name="rate" id="rate-5">
                        <label for="rate-5" class="star"></label>
                    </div>
                </div>
                <div class="rate-crits">
                    <span>Тохижилт</span>
                    <div class="star-wid">
                        <input type="radio" name="rate" id="rate-1">
                        <label for="rate-1" class="star" src></label>
                        <input type="radio" name="rate" id="rate-2">
                        <label for="rate-2" class="star"></label>
                        <input type="radio" name="rate" id="rate-3">
                        <label for="rate-3" class="star"></label>
                        <input type="radio" name="rate" id="rate-4">
                        <label for="rate-4" class="star"></label>
                        <input type="radio" name="rate" id="rate-5">
                        <label for="rate-5" class="star"></label>
                    </div>
                </div>
                <div class="rate-crits">
                    <span>Залгуурын хүрэлцээ</span>
                    <div class="star-wid">
                        <input type="radio" name="rate" id="rate-1">
                        <label for="rate-1" class="star" src></label>
                        <input type="radio" name="rate" id="rate-2">
                        <label for="rate-2" class="star"></label>
                        <input type="radio" name="rate" id="rate-3">
                        <label for="rate-3" class="star"></label>
                        <input type="radio" name="rate" id="rate-4">
                        <label for="rate-4" class="star"></label>
                        <input type="radio" name="rate" id="rate-5">
                        <label for="rate-5" class="star"></label>
                    </div>
                </div>
                <button class="add-rate">Нэмэх</button>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.#Render();
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

window.customElements.define("rating-pop-up", RatingPopUp);

class RatingPopUp extends HTMLElement {
  constructor() {
    super();
    //implementation
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
                    .star{
                        color: var(--color-border);
                        font-size: 2rem;
                        &:hover{
                            color: var(--color-primary);
                        }
                    }
                </style>
                <div class="popup-inner">
                    <button id="close-rating"><i class="fa-solid fa-xmark" ></i></button>
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

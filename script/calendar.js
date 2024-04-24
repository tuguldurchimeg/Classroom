class Calendar extends HTMLElement {
  constructor() {
    super();
    //implementation
  }

  Render() {
    return `<div>
        <span >&#8249;</span>
        <p class="current-date">03/04-03/17</p>
        <span >&#8250;</span>
    </div>
    <main class="calendar">
        <ul class="weeks">
            <li>Да</li>
            <li>Мя</li>
            <li>Лх</li>
            <li>Пү</li>
            <li>Ба</li>
            <li>Бя</li>
            <li>Ня</li>
        </ul>
        <ul class="days">
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
        </ul>
    </main>`;
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

window.customElements.define("calendar-cm", Calendar);

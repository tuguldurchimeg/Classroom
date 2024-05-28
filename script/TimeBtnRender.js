export default class TimeBtn {
  constructor(timeObj) {
    this.time = timeObj.time;
    this.stat = timeObj.status;
  }
  Render() {
    return `
    <li>
        <button class="timeBtn">
        <time datetime="16:00">${this.time / 100}:${this.time % 100}</time>
        </button>
    </li>`;
  }
}

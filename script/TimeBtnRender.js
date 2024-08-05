export default class TimeBtn {
  constructor(timeObj) {
    this.date = timeObj.date;
    this.garag = timeObj.garag;
    this.time = timeObj.time;
    this.stat = timeObj.status;
    this.click = "";
  }
  Render() {
    let hours = Math.floor(this.time / 100);
    let minutes = this.time % 100;

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    return `
    <li>
        <button class="timeBtn">
        <time datetime="16:00">${hours}:${minutes}</time>
        </button>
    </li>`;
  }
}

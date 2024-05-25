export class RenderClass {
  constructor(data) {
    this.data = data;
  }

  render_class_list() {
    const { data } = this;

    return `
            <article class="class-section-2">
                <div class="img">
                    <img src="${data.imgSrc}" alt="${data.imgAlt}" class="image">
                </div>
                <section class="details">
                <a href="${data.href}">

                    <div class="heartdetailsgrid">
                        <div class="font">
                            <h3>${data.header}</h3>
                            <div class="class-type">${data.classType}</div>
                        </div>
                        <img src="${data.heartImgSrc}" alt="${data.heartImgAlt}" class="heart-grey">
                    </div>
                    <ul class="details-list">
                        <li>${data.date}</li>
                        <li>
                            <button class="start-time-btn"><span>${data.startTime}</span></button>
                        </li>
                        <li>
                            <button class="end-time-btn"><span>${data.endTime}</span></button>
                        </li>
                    </ul>
                 </a>
                </section>
                <div class="cancel">
                    <button class="cancel-btn" data-id="${data.id}"><img src="${data.cancelImgSrc}" alt="${data.cancelImgAlt}"></button>
                </div>
            </article>
        `;
  }
}

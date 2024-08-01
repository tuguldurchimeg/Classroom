import { RenderClass } from "./render-class.js";

class ClassComponent extends HTMLElement {
  constructor() {
    super();
    this.renderData = this.renderData.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  connectedCallback() {
    this.renderData();
  }

  removeClass(event) {
    console.log(event); // Log the event to see if it's being triggered
    const id = event.target.closest("button").dataset.id; // Using closest to find the button element if the img inside the button was clicked
    console.log("id:", id);
    const element = document.querySelector(`article[data-id="${id}"]`);
    if (element) {
      element.parentNode.removeChild(element);
      this.updateView(); // Re-render the view after removing the element
    }
  }

  async updateView() {
    const container = this.querySelector(".verified");
    if (container) {
      container.innerHTML = ""; // Clear the existing content
    }
    await this.renderData(); // Re-fetch and re-render the data
  }

  async renderData() {
    const urlParams = new URLSearchParams(window.location.search);
    const stateFilter = urlParams.get("state"); // Assuming the URL parameter is named 'state'

    const container =
      this.querySelector(".verified") || document.createElement("div");
    container.classList.add("verified");
    this.appendChild(container);

    try {
      const response = await fetch("components/user/data.json");
      const jsonData = await response.json();

      jsonData.forEach((item) => {
        if (item.state === stateFilter) {
          const renderClass = new RenderClass(item);
          const classElement = document.createElement("div");
          classElement.innerHTML = renderClass.render_class_list();
          container.appendChild(classElement);

          // Attach the event listener here, ensuring it's done after elements are added to the DOM
          const cancelButton = classElement.querySelector(
            `button[data-id="${item.id}"]`
          );
          if (cancelButton) {
            cancelButton.addEventListener("click", this.removeClass);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }
}
window.customElements.define("class-component", ClassComponent);

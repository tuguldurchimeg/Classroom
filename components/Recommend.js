import ClassRen from "../script/ClassRender.js";
class Recommend extends HTMLElement {
  constructor() {
    super();
  }

  async #fetchClasses() {
    try {
      const response = await fetch("http://localhost:3000/recommended");
      const data = await response.json();
      return data.recommend;
    } catch (error) {
      console.error("Error fetching recommended classes:", error);
      return [];
    }
  }

  async #Render() {
    const responseData = await this.#fetchClasses();
    const classSectionHTMLArray = responseData.map((classObj) => {
      const classInstance = new ClassRen(classObj);
      return classInstance.Render();
    });
    const classSectionHTML = classSectionHTMLArray.join("");
    this.innerHTML = classSectionHTML;
  }

  connectedCallback() {
    this.#Render();
  }
}

window.customElements.define("recommended-classes", Recommend);

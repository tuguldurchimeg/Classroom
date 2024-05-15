import { RenderClass } from './render-class.js';

class ClassComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.renderData();
    }

    async renderData() {
        document.addEventListener('DOMContentLoaded', async () => {
            const container = document.querySelector('.verified');

            try {
                const response = await fetch('script/components/user/data.json');
                const jsonData = await response.json();

                jsonData.forEach(item => {
                    const renderClass = new RenderClass(item);
                    const classRender = document.createElement('class-component');
                    classRender.innerHTML = renderClass.render_class_list(); 
                    container.appendChild(classRender);
                });
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        });
    }
}
window.customElements.define('class-component', ClassComponent);

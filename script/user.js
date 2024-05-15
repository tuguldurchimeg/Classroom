class user extends HTMLElement {
    constructor() {
        super();
        this.count=0;
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.innerHTML = this.Render();
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
};

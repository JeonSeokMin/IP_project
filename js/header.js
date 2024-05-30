class HeaderComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header id="header">

        </header>
      `;
    }
  }
  
  customElements.define('header', HeaderComponent);
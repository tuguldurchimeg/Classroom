class TsagList extends HTMLElement {
  constructor() {
    super();
    this.startTsag = "07:40";
    this.endTsag = "21:45";
    this.firstSelectedTsag = null;
    this.lastSelectedTsag = null;
  }

  connectedCallback() {
    this.render();
    this.tsagGrid = this.querySelectorAll(".tsag-list button");

    this.tsagGrid.forEach((tsag) => {
      tsag.addEventListener("click", () => this.onTsagClick(tsag));
    });
  }

  render() {
    this.innerHTML = `
       <ul class="tsag-list" id="tsag-list">
         <li><button>07:40</button></li>
         <li><button>08:25</button></li>
         <li><button>09:20</button></li>
         <li><button>10:05</button></li>
         <li><button>11:00</button></li>
         <li><button>11:45</button></li>
         <li><button>12:40</button></li>
         <li><button>13:25</button></li>
         <li><button>14:20</button></li>
         <li><button>15:05</button></li>
         <li><button>16:00</button></li>
         <li><button>16:45</button></li>
         <li><button>17:40</button></li>
         <li><button>18:25</button></li>
         <li><button>19:20</button></li>
         <li><button>20:05</button></li>
         <li><button>21:00</button></li>
         <li><button>21:45</button></li>
       </ul>
     `;
  }

  onTsagClick(tsag) {
    if (!this.firstSelectedTsag && !tsag.classList.contains("inactive")) {
      this.firstSelectedTsag = tsag;
      this.startTsag = tsag.innerText;

      this.firstSelectedTsag.classList.add("tsag-active");
    } else if (!this.lastSelectedTsag && !tsag.classList.contains("inactive")) {
      this.lastSelectedTsag = tsag;
      this.endTsag = tsag.innerText;
      this.lastSelectedTsag.classList.add("tsag-active");

      const firstIndex = [...this.tsagGrid].indexOf(this.firstSelectedTsag);
      const lastIndex = [...this.tsagGrid].indexOf(this.lastSelectedTsag);

      const minIndex = Math.min(firstIndex, lastIndex);
      const maxIndex = Math.max(firstIndex, lastIndex);

      for (let i = minIndex + 1; i < maxIndex; i++) {
        this.tsagGrid[i].classList.add("tsag-active");
      }

      this.updateTsagInfo();
    } else if (tsag.classList.contains("inactive")) {
      //nothing;
    } else {
      // Reset selection if both first and last selected days are already set
      this.resetSelection();
      this.firstSelectedTsag = tsag;
      this.startTsag = tsag.innerText;
      this.lastSelectedTsag = null;
      tsag.classList.add("tsag-active");
      this.updateTsagInfo();
    }
  }

  resetSelection() {
    if (this.firstSelectedTsag)
      this.firstSelectedTsag.classList.remove("tsag-active");
    if (this.lastSelectedTsag)
      this.lastSelectedTsag.classList.remove("tsag-active");
    this.tsagGrid.forEach((tag) => {
      tag.classList.remove("tsag-active");
    });
    this.firstSelectedTsag = null;
    this.lastSelectedTsag = null;
  }

  tsagUpdate() {
    const event = new CustomEvent("tsagChanged", {
      bubbles: true,
      detail: {
        startTsag: this.startTsag,
        endTsag: this.endTsag,
      },
    });
    this.dispatchEvent(event);
  }

  updateTsagInfo() {
    document.getElementById(
      "tsag-info"
    ).innerText = `${this.startTsag} - ${this.endTsag}`;
    this.tsagUpdate();
  }
}

window.customElements.define("tsag-lister", TsagList);

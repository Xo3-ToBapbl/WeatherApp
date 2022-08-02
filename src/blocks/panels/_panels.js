export * from "./weather/_weather-panel.js";
export * from "./search/_search-panel.js";

(()=> {

  document.querySelector(".panels-container").addEventListener("swapPanel", swapPanels);

  function swapPanels() {
    let angle = event.detail.angle;
    let panelsContainer = event.currentTarget;
    let panelsContainerInner = document.querySelector('.panels-container__inner');
  
    if (window.innerWidth > 428) {
      panelsContainer.style.overflow = 'hidden';
      setTimeout(() => panelsContainer.style.overflow = '', 300);
    }
    panelsContainerInner.style.transform = `rotateY(${angle}deg)`;
  }
  
})();
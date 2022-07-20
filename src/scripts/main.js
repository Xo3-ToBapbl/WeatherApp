import printMe from './print.js';

document.querySelector('.search-btn').onclick = () => swapSidePanel(180);
document.querySelector('.swap-panel-btn').onclick = () => swapSidePanel(0);

function swapSidePanel(angle) {
  let container = document.querySelector('.side-panels-container');
  let sidePanelsInner = document.querySelector('.side-panels-inner');

  if (window.innerWidth > 414) {
    container.style.overflow = 'hidden';
    setTimeout(() => container.style.overflow = '', 300);
  }
  sidePanelsInner.style.transform = `rotateY(${angle}deg)`;
}
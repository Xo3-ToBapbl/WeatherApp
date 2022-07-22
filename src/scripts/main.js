import printMe from './print.js';

document.querySelector('.search-btn').onclick = () => swapSidePanel(180);
document.querySelector('.swap-panel-btn').onclick = () => swapSidePanel(0);

new ButtonToggler('.theme-mode-btn', switchTheme);
new ButtonToggler('.temperature-unit-btn', switchTemperatureUnit);

function swapSidePanel(angle) {
  let container = document.querySelector('.side-panels-container');
  let sidePanelsInner = document.querySelector('.side-panels-inner');

  if (window.innerWidth > 414) {
    container.style.overflow = 'hidden';
    setTimeout(() => container.style.overflow = '', 300);
  }
  sidePanelsInner.style.transform = `rotateY(${angle}deg)`;
}

function ButtonToggler(selector, callback) {
  this.toggleButtons = [...document.querySelectorAll(selector)];
  this.toggleButtons.forEach((btn) => {
    btn.addEventListener('click', buttonToggled.bind(this));
    btn.addEventListener('click', callback);
  })

  function buttonToggled() {
    let targetBtn = event.target.closest('button');
    if (targetBtn.dataset.toggled === 'true') {
      return;
    }

    let currentToggledBtn = this.toggleButtons.find((btn) => btn.dataset.toggled === 'true');
    currentToggledBtn.setAttribute('data-toggled', 'false');
    targetBtn.setAttribute('data-toggled', 'true');
  }
}

function switchTheme() {
  let toggledBtn = event.target;
  if (toggledBtn.dataset.toggled === 'false') {
    return;
  }

  document.documentElement.setAttribute('data-theme', toggledBtn.dataset.theme);
}

function switchTemperatureUnit() {
  console.log('temp units switched');
}
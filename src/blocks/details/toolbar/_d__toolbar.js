(()=> {
  
  new ButtonToggler(".d__theme-mode-button", "switchTheme");
  new ButtonToggler(".d__temperature-unit-button", "switchTemperatureUnits");

  function ButtonToggler(selector, eventName) {
    this.eventName = eventName;
    this.toggleButtons = [...document.querySelectorAll(selector)];
    this.toggleButtons.forEach((btn) => btn.addEventListener("click", buttonToggled.bind(this))
    );
  
    function buttonToggled() {
      let targetBtn = event.currentTarget.closest("button");
      if (targetBtn.dataset.toggled === "true") {
        return;
      }

      let eventToDispatch = new CustomEvent(this.eventName,  {bubbles: true, cancelable: true, detail: targetBtn.dataset})
      let proceed = targetBtn.dispatchEvent(eventToDispatch);
      if (proceed === true) {
        let currentToggledBtn = this.toggleButtons.find((btn) => btn.dataset.toggled === "true");
        currentToggledBtn.setAttribute("data-toggled", "false");
        targetBtn.setAttribute("data-toggled", "true");
      }
    }
  }
  
  
})();
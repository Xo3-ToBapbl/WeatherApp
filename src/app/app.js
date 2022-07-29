import "$blocks/_blocks.js";

(()=> {
  
  document.addEventListener("onSwitchTheme", switchTheme);
  document.addEventListener("onSwitchTemperatureUnits", switchTemperatureUnit);

  function switchTheme() {
    document.documentElement.setAttribute("data-theme", event.detail.theme);
  }

  function switchTemperatureUnit() {
    console.log("Temperature units switched");
  }
  
})();
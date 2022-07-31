import "$blocks/_blocks.js";
import { initializeFirebase } from "$services/firebase.js";

((config) => {
  new Application(config);

  function Application(config) {

    initializeFirebase();
    initializeListeners();

    function initializeListeners() {

      document.addEventListener("onSwitchTheme", switchTheme);
      document.addEventListener("onSwitchTemperatureUnits", switchTemperatureUnit);
    }
    
    function switchTheme() {
      document.documentElement.setAttribute("data-theme", event.detail.theme);
    }
  
    function switchTemperatureUnit() {
      console.log("Temperature units switched");
    }
  }
})($app_config);
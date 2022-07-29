import "$blocks/_blocks.js";
import { initializeApp } from "firebase/app";

(()=> {
  
  new Application();

  function Application() {
    initializeFirebase();
    addEventListeners();
  
    function initializeFirebase() {
      const firebaseConfig = {
        apiKey: "AIzaSyBGZ3W4Kg67RWJ3-Ot4vdDLegsYx-x4bj0",
        authDomain: "weatherapp-9fe6e.firebaseapp.com",
        projectId: "weatherapp-9fe6e",
        storageBucket: "weatherapp-9fe6e.appspot.com",
        messagingSenderId: "1061920221511",
        appId: "1:1061920221511:web:0b067ef12549ad71c68462"
      };
  
      initializeApp(firebaseConfig);
    }
  
    function addEventListeners() {
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
})();
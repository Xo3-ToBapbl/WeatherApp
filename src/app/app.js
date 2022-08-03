import * as blocks from "$blocks/_blocks.js";
import * as utils from "$utils/_utils.js";
import { firebaseService } from "$services/_firebase.js";
import { weatherService } from "$services/_weather.js";
import { searchService } from "$services/_search.js";
import { ForecastModelBuilder } from "$lib/builders/_forecast-model-builder.js"

((config) => {
  
  new Application(config).initialize();

  function Application(config) {
    this.weatherPanelModel = new blocks.WeatherPanelModel(ForecastModelBuilder);
    this.citiesModel = new blocks.CitiesModel(ForecastModelBuilder);
    this.weekForecast = new blocks.WeekForecastModel(ForecastModelBuilder);
    this.initialize = function initialize() {
      setTodayDate();
      initializeListeners.call(this);
      initializeServices.call(this);
    };

    function initializeListeners() {
      document.addEventListener("switchTheme", _switchTheme);
      document.addEventListener("switchTemperatureUnits", _switchTemperatureUnit);
      document.addEventListener("requestWeatherData", this.weatherPanelModel.showLoader);
      document.addEventListener("requestWeatherData", weatherService.requestWeatherData.bind(weatherService));
      document.addEventListener("requestCityData", (e) => searchService.requestCityData.call(searchService, e.detail));

      weatherService.eventTarget.addEventListener("weatherDataReceived", this.weatherPanelModel.updateData);
      weatherService.eventTarget.addEventListener("weatherDataReceived", this.weekForecast.updateData);
      searchService.eventTarget.addEventListener("cityDataReceived", this.citiesModel.updateData)

      return this;
    }

    function setTodayDate() {
      blocks.setTodayDate(utils.getFormattedDate(new Date(Date.now())));
    }

    function initializeServices() {
      firebaseService.initialize();
      weatherService.initialize();

      return this;
    }
    
    function _switchTheme() {
      document.documentElement.setAttribute("data-theme", event.detail.theme);
    }
  
    function _switchTemperatureUnit() {
      console.log("Temperature units switched");
    }
  }

})($app_config);
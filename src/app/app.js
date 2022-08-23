import * as blocks from "$blocks/_blocks.js";
import * as utils from "$utils/_utils.js";

import { firebaseService } from "$services/_firebase.js";
import { weatherService } from "$services/_weather.js";
import { searchService } from "$services/_search.js";
import { cookiesRepository } from "$lib/repositories/_cookies.js"
import { ForecastModelBuilder } from "$lib/builders/_forecast-model-builder.js"

((config) => {
  
  new Application(config).initialize();

  function Application(config) {
    this.notificationModel = new blocks.NotificationModel();
    this.weatherPanelModel = new blocks.WeatherPanelModel(ForecastModelBuilder);
    this.citiesModel = new blocks.CitiesModel(ForecastModelBuilder);
    this.weekForecast = new blocks.WeekForecastModel(ForecastModelBuilder);
    this.highlights = new blocks.HighlightsModel(ForecastModelBuilder);
    this.initialize = function initialize() {
      setTodayDate();
      initializeListeners.call(this);
      initializeServices.call(this, config);
    };

    function initializeListeners() {
      document.addEventListener("switchTheme", _switchTheme);
      document.addEventListener("switchTemperatureUnits", _switchTemperatureUnit);
      document.addEventListener("showNotification", this.notificationModel.openNotification.bind(this.notificationModel));
      document.addEventListener("requestWeatherData", this.weatherPanelModel.showLoader);
      document.addEventListener("citySelected", (e) => this.weatherPanelModel.updateLocation(e.detail.name));
      document.addEventListener("requestWeatherData", this.weekForecast.showLoader);
      document.addEventListener("requestWeatherData", this.highlights.showLoader);
      document.addEventListener("requestWeatherData", (e) => weatherService.requestWeatherData.call(weatherService, e.detail.latitude, e.detail.longitude));
      document.addEventListener("requestCityData", (e) => searchService.requestCityData.call(searchService, e.detail));

      weatherService.eventTarget.addEventListener("weatherDataReceived", this.weatherPanelModel.updateData);
      weatherService.eventTarget.addEventListener("weatherDataReceived", this.weekForecast.updateData);
      weatherService.eventTarget.addEventListener("weatherDataReceived", this.highlights.updateData);
      weatherService.eventTarget.addEventListener("showError", (e) => this.notificationModel.openNotification(e.detail));

      searchService.eventTarget.addEventListener("cityDataReceived", this.citiesModel.updateData);
      searchService.eventTarget.addEventListener("showError", (e) => this.notificationModel.openNotification(e.detail))

      return this;
    }

    function setTodayDate() {
      blocks.setTodayDate(utils.getFormattedDate(new Date(Date.now())));
    }

    function initializeServices(config) {
      const defaultCity = {
        name: cookiesRepository.get("cityName") ?? "London",
        latitude: cookiesRepository.get("latitude") ?? 51.50853,
        longitude: cookiesRepository.get("longitude") ?? -0.12574,
      }
      this.weatherPanelModel.updateLocation(defaultCity.name);

      firebaseService.initialize();
      searchService.initialize(config);
      weatherService.initialize(config, {
        latitude:defaultCity.latitude, 
        longitude:defaultCity.longitude
      });

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
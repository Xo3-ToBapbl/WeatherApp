import * as blocks from "$blocks/_blocks";
import * as utils from "$utils/_utils";

import { firebaseService } from "$services/_firebase";
import { weatherService } from "$services/_weather";
import { searchService } from "$services/_search";
import { locationService } from "$lib/system/_location"
import { cookiesRepository } from "$lib/repositories/_cookies"
import { ForecastModelBuilder } from "$lib/builders/_forecast-model-builder"

window.gm_authFailure = function gm_authFailure() {
  window.googleMap = {
    isAvailable: false,
    error: "Authentication to Google Map service failed. Please, reload page."
  }
}

window.initGoogleMap = function () {
  window.googleMap = {
    isAvailable: true,
    autocomplete: new google.maps.places.AutocompleteService(),
    geocoder: new google.maps.Geocoder(),
  }
};

((config) => {
  
  new Application(config).initialize();

  function Application(config) {

    this.notificationModel = new blocks.NotificationModel();
    this.weatherPanelModel = new blocks.WeatherPanelModel(ForecastModelBuilder);
    this.citiesModel = new blocks.CitiesModel(ForecastModelBuilder);
    this.weekForecast = new blocks.WeekForecastModel(ForecastModelBuilder);
    this.highlights = new blocks.HighlightsModel(ForecastModelBuilder);
    
    this.initialize = function initialize() {
      initializeListeners.call(this);
      initializeServices.call(this, config);
      
      setTodayDate();
      setTheme();
      setTemperatureUnits();
    };

    function initializeListeners() {
      document.addEventListener("switchTheme", _switchTheme);
      document.addEventListener("switchTemperatureUnits", _switchTemperatureUnit.bind(this));
      document.addEventListener("showNotification", this.notificationModel.openNotification.bind(this.notificationModel));
      document.addEventListener("citySelected", (e) => this.weatherPanelModel.updateLocation(e.detail.cityName));
      document.addEventListener("requestCityData", (e) => searchService.requestCityData.call(searchService, e.detail));
      document.addEventListener("requestWeatherData", onRequestWeatherData.bind(this));

      weatherService.eventTarget.addEventListener("showError", (e) => this.notificationModel.openNotification(e.detail));
      weatherService.eventTarget.addEventListener("weatherDataReceived", (e) => {
        this.weekForecast.updateData(e.detail);
        this.weatherPanelModel.updateData(e.detail);
        this.highlights.updateData(e.detail);
      });

      searchService.eventTarget.addEventListener("cityDataReceived", this.citiesModel.updateData);
      searchService.eventTarget.addEventListener("showError", (e) => this.notificationModel.openNotification(e.detail));

      locationService.eventTarget.addEventListener("showError", (e) => this.notificationModel.openNotification(e.detail));
      locationService.eventTarget.addEventListener("citySelected", (e) => this.weatherPanelModel.updateLocation(e.detail.cityName));
      locationService.eventTarget.addEventListener("requestWeatherData", (e) => onRequestWeatherData.call(this, e));

      return this;

      function onRequestWeatherData(e) {
        this.weatherPanelModel.showLoader();
        this.weekForecast.showLoader();
        this.highlights.showLoader();
        weatherService.requestWeatherData.call(weatherService, e.detail);
      }
    }

    function setTodayDate() {
      blocks.setTodayDate(utils.getFormattedDate(new Date(Date.now())));
    }

    function setTheme() {
      const theme = cookiesRepository.get("theme") ?? "dark";

      let eventToDispatch = new CustomEvent("setTheme",  {bubbles: true, cancelable: true, detail: theme})
      document.dispatchEvent(eventToDispatch);
    }

    function setTemperatureUnits() {
      const units = cookiesRepository.get("temperatureUnits") ?? "celsius";

      let eventToDispatch = new CustomEvent("setTemperatureUnits",  {bubbles: true, cancelable: true, detail: units})
      document.dispatchEvent(eventToDispatch);
    }

    function initializeServices(config) {
      const defaultCity = cookiesRepository.getCachedModel();
      this.weatherPanelModel.updateLocation(defaultCity.cityName);

      firebaseService.initialize();
      searchService.initialize(config);
      weatherService.initialize(config, defaultCity);

      return this;
    }
    
    function _switchTheme() {
      const theme = event.detail.theme;
      cookiesRepository.set("theme", theme);

      document.documentElement.setAttribute("data-theme", theme);
    }
  
    function _switchTemperatureUnit() {
      const unit = event.detail.temperatureUnit;
      cookiesRepository.set("temperatureUnits", unit);

      this.weatherPanelModel.updateTemperatureUnit(unit);
      this.weekForecast.updateTemperatureUnit(unit);
    }
  }

})($app_config);
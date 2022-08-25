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
      setTodayDate();
      initializeListeners.call(this);
      initializeServices.call(this, config);
    };

    function initializeListeners() {
      document.addEventListener("switchTheme", _switchTheme);
      document.addEventListener("switchTemperatureUnits", _switchTemperatureUnit);
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

    function initializeServices(config) {
      const defaultCity = cookiesRepository.getCachedModel();
      this.weatherPanelModel.updateLocation(defaultCity.cityName);

      firebaseService.initialize();
      searchService.initialize(config);
      weatherService.initialize(config, defaultCity);

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
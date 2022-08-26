import { searchService } from "../services/_search";

export const locationService = (() => {
  const eventTarget = new EventTarget();
  return {
    eventTarget: eventTarget,
    get() {
      try {
        navigator.geolocation.getCurrentPosition(success, error);
      } catch (error) {
        console.log(error);
        raiseLocationError(error);
      }
    }
  }

  async function success(position) {
    const cityModel = await searchService.requestCityModelByCoords({lat: position.coords.latitude, lng: position.coords.longitude});

    raiseCitySelected(cityModel);
    raiseRequestWeatherData(cityModel);
  }

  function error(error) {
    let message = "An unknown error occurred during requesting location."
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "Please, grant location permission to use location service."
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        message = "The request to get location timed out."
        break;
      case error.UNKNOWN_ERROR:
        break;
    }

    raiseLocationError(message);
  }

  function raiseCitySelected(cityModel) {
    const citySelectedEvent = new CustomEvent("citySelected", {bubbles: true, cancelable: true, detail: {cityName: cityModel.cityName}});
    eventTarget.dispatchEvent(citySelectedEvent);
  }

  function raiseRequestWeatherData(cityModel) {
    const citySelectedEvent = new CustomEvent("requestWeatherData", {bubbles: true, cancelable: true, detail: cityModel.placeId});
    eventTarget.dispatchEvent(citySelectedEvent);
  }

  function raiseLocationError(message) {
    let eventToDispatch = new CustomEvent("showError", {detail: message});
    eventTarget.dispatchEvent(eventToDispatch);
  }

})();
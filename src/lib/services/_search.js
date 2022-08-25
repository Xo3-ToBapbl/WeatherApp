import {cookiesRepository} from "../repositories/_cookies";

export const searchService = (() => {
  let eventTarget = new EventTarget();
  
  return {
    eventTarget: eventTarget,

    initialize(config) { },

    requestCityData(name) {
      const autocomplete = getAutocomplete();
      if (!autocomplete) {
        return;
      }

      try {

        autocomplete.getPlacePredictions({input: name, types: ["(cities)"]}, (predictions) => {
          const placeModels = predictions.slice(0, 9).map(prediction => {
            return {
              name: prediction.structured_formatting.main_text,
              code: prediction.structured_formatting.secondary_text,
              placeId: prediction.place_id
            };
          });

          raiseResult(placeModels);
        });
        
      } catch (error) {
        raiseError(error);
      }
    },

    async requestCityModelByPlaceId(placeId) {
      const geocoder = getGeocoder();
      if (!geocoder) {
        return;
      }

      try {

        const response = await geocoder.geocode({placeId: placeId});
        return getCityModelFrom(response);

      } catch (error) {
        raiseError(error);
      }
    },
    
    async requestCityModelByCoords(coords) {
      const geocoder = getGeocoder();
      if (!geocoder) {
        return;
      }

      try {

        const response = await geocoder.geocode({location: {lat: coords.lat, lng: coords.lng}});
        return getCityModelFrom(response);

      } catch (error) {
        raiseError(error);
      }
    }

  };

  function getAutocomplete() {
    if (window.googleMap.isAvailable) {
      return window.googleMap.autocomplete;
    }

    raiseError(window.googleMap.error);
  }

  function getGeocoder() {
    if (window.googleMap.isAvailable) {
      return window.googleMap.geocoder;
    }

    raiseError(window.googleMap.error);
  }

  function getCityModelFrom(response) {
    const item = response.results.find(item => item.types.includes("locality"));
    const cityModel = {
      cityName: item.address_components.find(component => component.types.includes("locality")).long_name,
      placeId: item.place_id,
      lat: item.geometry.location.lat(),
      lng: item.geometry.location.lng(),
    };

    cookiesRepository.setCachedModel(cityModel);
    return cityModel;
  }

  function raiseResult(result) {
    let eventToDispatch = new CustomEvent("cityDataReceived", {detail: result});
    eventTarget.dispatchEvent(eventToDispatch);
  }

  function raiseError(error) {
    console.log(`SearchService: ${error}`);

    let eventToDispatch = new CustomEvent("showError", {detail: "Error appeared during fetching search city data. Please, reload page."});
    eventTarget.dispatchEvent(eventToDispatch);
  }

})();
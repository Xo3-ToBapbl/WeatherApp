import { requestExecutor } from "$lib/system/_request";
import { searchService } from "./_search";

export const weatherService =(() => {
  let host = "";
  let abortController = null;
  let eventTarget = new EventTarget();

  return {
    eventTarget: eventTarget,
    
    initialize(config, defaultCity) {
      host = config.host;
      requestWeatherDataByCoords(defaultCity.lat, defaultCity.lng, false);
    },
    
    async requestWeatherData(placeId, abortPrevious) {
      try {

        const citiesModel = await searchService.requestCityModelByPlaceId(placeId);
        if (citiesModel) {
          requestWeatherDataByCoords(citiesModel.lat, citiesModel.lng, abortPrevious);
        }

      } catch (error) {
        raiseError(error);
      }
    },
  };


  async function requestWeatherDataByCoords(lat, lng, abortPrevious) {
    abortIf(abortPrevious);
    abortController = new AbortController();

    const url = `${host}/weather/forecast?latitude=${lat}&longitude=${lng}`;
    const params = { method: "GET", signal: abortController.signal };
    const request = fetch(url, params);
    const response = await requestExecutor.execute(request);

    response.handle(
      function success(response) { raiseResult(response.result); },
      function failed(response) { raiseError(response.error); raiseResult([]) },
      function aborted() { console.log("SearchService.requestCityData: operation aborted"); },
    );
  }

  function abortIf(abortPrevious) {
    abortPrevious ??= true;

    if (abortPrevious && abortController) {
      abortController.abort();
    }
  }
        
  function raiseResult(result) {
    let weatherModels = result.map(data => {
      data.wind = data.wind.toFixed(1);
      data.visibility = data.visibility.toFixed(1);
      return data;
    })
    let eventToDispatch = new CustomEvent("weatherDataReceived", {detail: weatherModels});
    eventTarget.dispatchEvent(eventToDispatch);
  }

  function raiseError(error) {
    console.log(`WeatherService: ${error}`);

    let eventToDispatch = new CustomEvent("showError", {detail: "Error appeared during fetching weather data. Please, reload page."});
    eventTarget.dispatchEvent(eventToDispatch);
  }

})();
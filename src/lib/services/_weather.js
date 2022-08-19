import {makeCancelable} from "$utils/_utils.js"

export const weatherService =(() => {

  let previousPromise = null;

  return {
    host: "",
    eventTarget: new EventTarget(),
    
    initialize(config) {
      this.host = config.host;
      this.requestWeatherData(51.50853, -0.12574, false);
    },
    
    requestWeatherData(latitude, longitude, cancelPrevious) {
      cancelPrevious ??= true;
      if (cancelPrevious && previousPromise) {
        previousPromise.cancel();
      }
  
      previousPromise = makeCancelable(getWeatherData.call(this, latitude, longitude));
      previousPromise.promise
        .then((result) => raiseResult.call(this, result))
        .catch(logError);
  
      function raiseResult(result) {
        let eventToDispatch = new CustomEvent("weatherDataReceived", {detail: result});
        this.eventTarget.dispatchEvent(eventToDispatch);
      }
  
      function logError(error) {
        if (error.isCanceled) {
          console.log("WeatherService.requestWeatherData: operation cancelled")
        } else {
          console.log(`WeatherService: ${error}`)
        }
      }
    },
  };
        
  function getWeatherData(latitude, longitude) {
    return new Promise(async (resolve, _) => {

      let response = await fetch(`${this.host}/weather/forecast?latitude=${latitude}&longitude=${longitude}`, { method: "GET" });
      let weatherData = await response.json();
      let weatherModels = weatherData.result.map(data => {
        data.wind = data.wind.toFixed(1);
        data.visibility = data.visibility.toFixed(1);
        return data;
      })

      resolve(weatherModels);
    });
  }

})();
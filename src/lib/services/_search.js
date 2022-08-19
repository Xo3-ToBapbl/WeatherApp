import {makeCancelable} from "$utils/_utils.js"

export const searchService = (() => {
  
  let previousPromise = null;
  
  return {
    eventTarget: new EventTarget(),
    host: "",

    initialize(config) {
      this.host = config.host;
    },

    requestCityData(name, cancelPrevious) {
      cancelPrevious ??= true;
      if (cancelPrevious && previousPromise) {
        previousPromise.cancel();
      }

      previousPromise = makeCancelable(searchCity.call(this, name));
      previousPromise.promise
        .then((result) => raiseResult.call(this, result))
        .catch(logError);

      function raiseResult(result) {
        let eventToDispatch = new CustomEvent("cityDataReceived", {detail: result});
        this.eventTarget.dispatchEvent(eventToDispatch);
      }

      function logError(error) {
        if (error.isCanceled) {
          console.log("SearchService.requestCityData: operation cancelled")
        } else {
          console.log(`SearchService: ${error}`)
        }
      }
    },
  };
  
  function searchCity(name) {
    return new Promise(async (resolve, _) => {

      let response = await fetch(`${this.host}/cities/find/${name}`, { method: "GET" });
      let cityModels = await response.json();

      resolve(cityModels.result);
      
    });
  }

})();
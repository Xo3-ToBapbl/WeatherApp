import {makeCancelable} from "$utils/_utils.js"

export const searchService = (() => {
  
  const capitals = [
    {
        "name": "London",
        "code": "GB",
        "latitude": 51.50853,
        "longitude": -0.12574
    },
    {
        "name": "East London",
        "code": "ZA",
        "latitude": -33.01529,
        "longitude": 27.91162
    },
    {
        "name": "London",
        "code": "US",
        "latitude": 37.12898,
        "longitude": -84.08326
    },
    {
        "name": "London",
        "code": "CA",
        "latitude": 42.98339,
        "longitude": -81.23304
    },
    {
        "name": "Londonderry",
        "code": "AU",
        "latitude": -33.64656,
        "longitude": 150.73515
    },
    {
        "name": "Glondong",
        "code": "ID",
        "latitude": -6.7924,
        "longitude": 111.8916
    },
    {
        "name": "West End of London",
        "code": "GB",
        "latitude": 51.51414,
        "longitude": -0.1551
    },
    {
        "name": "Londonderry County Borough",
        "code": "GB",
        "latitude": 54.99721,
        "longitude": -7.30917
    },
    {
        "name": "City of London",
        "code": "GB",
        "latitude": 51.51279,
        "longitude": -0.09184
    },
    {
        "name": "London Village",
        "code": "KI",
        "latitude": 1.98487,
        "longitude": -157.47502
    }
  ];
  let previousPromise = null;
  
  return {
    eventTarget: new EventTarget(),
    
    initialize() {

    },
    
    requestCityData(name, cancelPrevious) {
      cancelPrevious ??= true;
      if (cancelPrevious && previousPromise) {
        previousPromise.cancel();
      }

      previousPromise = makeCancelable(searchCity(name));
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
    let promise = new Promise((resolve, _) => {

      setTimeout(() => {
        let result = capitals.filter((item) => {
          return item["name"].toLowerCase().includes(name.toLowerCase()) ;
        });

        resolve(result);
      }, 1000);
    });

    return promise;
  }

})();

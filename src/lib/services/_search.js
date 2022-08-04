import {makeCancelable} from "$utils/_utils.js"

export const searchService = (() => {
  
  let previousPromise = null;
  
  return {
    eventTarget: new EventTarget(),

    async initialize() {
      let result = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: {
          "content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "grant_type": "client_credentials",
          "client_id": "1EkHdZtaes3xzeaRiOhAiJcgn2Cy7zKQ",
          "client_secret": "Q8qmXm7gj82n9Vjv"
        }),
      });
  
      console.log(result);
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
          return item["city"].toLowerCase().includes(name.toLowerCase()) ;
        });

        resolve(result);
      }, 1000);
    });

    return promise;
  }

})();

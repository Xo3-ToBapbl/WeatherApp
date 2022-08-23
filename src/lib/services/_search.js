import { requestExecutor } from "$lib/system/_request";

export const searchService = (() => {
  let host = "";
  let abortController = null;
  let eventTarget = new EventTarget();
  
  return {
    eventTarget: eventTarget,

    initialize(config) {
      host = config.host;
    },

    async requestCityData(name, abortPrevious) {
      abortIf(abortPrevious);
      abortController = new AbortController();

      const url = `${host}/cities/find/${name}`;
      const params = { method: "GET", signal: abortController.signal };
      const request = fetch(url, params);
      const response = await requestExecutor.execute(request);

      response.handle(
        function success(response) { raiseResult(response.result); },
        function failed(response) { raiseError(response.error); },
        function aborted() { console.log("SearchService.requestCityData: operation aborted"); },
      );
    },
  };

  function abortIf(abortPrevious) {
    abortPrevious ??= true;

    if (abortPrevious && abortController) {
      abortController.abort();
    }
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
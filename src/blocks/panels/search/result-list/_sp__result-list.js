import * as utils from "$utils/_utils.js";

export function CitiesModel(builder) {
  return builder
    .updatable(updateData)
    .build();

  function updateData() {
    console.log(`search data updated: ${event.detail}`);
  }
};

(()=> {

  document.querySelector(".sp__result-list").addEventListener("click", resultSelected);
  document.querySelector(".sp__search-input").addEventListener("input", utils.throttle(cityTyped, 500));

  function resultSelected() {
    let selectedResult = event.target.closest("li");

    if (!selectedResult)
      return;

    if (!this.contains(selectedResult))
      return;

    let eventToDispatch = new CustomEvent("requestWeatherData",  {bubbles: true, cancelable: true, detail: selectedResult.innerText});
    let proceed = selectedResult.dispatchEvent(eventToDispatch);
    if (proceed) {
      let eventToDispatch = new CustomEvent("swapPanel", {bubbles: true, detail: {angle: 0}});
      selectedResult.dispatchEvent(eventToDispatch);
    }
  }

  function cityTyped() {
    console.log("city typed");

    let cityToSearch = this.value;
    if (cityToSearch.length <= 3){
      return;
    }

    let eventToDispatch = new CustomEvent("requestCityData",  {bubbles: true, cancelable: true, detail: cityToSearch});
    this.dispatchEvent(eventToDispatch);
  }

})();
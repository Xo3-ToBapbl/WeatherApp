import * as utils from "$utils/_utils.js";

export function CitiesModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .build();

  model.listElement = document.querySelector(".sp__result-list");
  return model;

  function updateData() {
    console.log(`search data updated: ${event.detail}`);
    let cities = [...event.detail];
    if (cities.length == 0) {
      this.listElement.innerHTML = "";
      return;
    }

    let cityItems = cities.map((model) => getCityTemplate(model.city));
    this.listElement.innerHTML = cityItems.join("");
  }

  function getCityTemplate(cityName) {
    return `
      <li class="sp__result-list-item secondary-text">
        ${cityName}
        <span class="material-icons sp__result-list-icon">arrow_forward_ios</span>
      </li>`;
  }
};

(()=> {

  document.querySelector(".sp__result-list").addEventListener("click", resultSelected);
  document.querySelector(".sp__search-input").addEventListener("input", utils.throttle(cityTyped));

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
    if (cityToSearch.length < 3){
      return;
    }

    let eventToDispatch = new CustomEvent("requestCityData",  {bubbles: true, cancelable: true, detail: cityToSearch});
    this.dispatchEvent(eventToDispatch);
  }

})();
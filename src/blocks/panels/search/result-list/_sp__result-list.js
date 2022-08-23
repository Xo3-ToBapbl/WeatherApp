import * as utils from "$utils/_utils.js";
import { cookiesRepository } from "$lib/repositories/_cookies.js"

export function CitiesModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .build();

  model.listElement = document.querySelector(".sp__result-list");
  return model;

  function updateData() {
    let cityModels = [...event.detail];
    if (cityModels.length == 0) {
      this.listElement.innerHTML = "";
      return;
    }

    let cityItems = cityModels.map((model) => getCityTemplate(model));
    this.listElement.innerHTML = cityItems.join("");
  }

  function getCityTemplate(cityModel) {
    return `
      <li class="sp__result-list-item secondary-text" data-name="${cityModel.name}" data-latitude="${cityModel.latitude}" data-longitude="${cityModel.longitude}">
        ${cityModel.name.substring(0, 30)}, ${cityModel.code}
        <span class="material-icons sp__result-list-icon">arrow_forward_ios</span>
      </li>`;
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

    updateCookies(selectedResult.dataset);
    raiseCitySelectedEvent(selectedResult.dataset, selectedResult);
    raiseRequestWeatherDataEvent(selectedResult.dataset, selectedResult);
  }

  function cityTyped() {
    let cityToSearch = this.value;
    if (cityToSearch.length < 3){
      return;
    }

    let eventToDispatch = new CustomEvent("requestCityData",  {bubbles: true, cancelable: true, detail: cityToSearch});
    this.dispatchEvent(eventToDispatch);
  }

  function updateCookies(dataset) {
    cookiesRepository.set("cityName", dataset.name);
    cookiesRepository.set("latitude", dataset.latitude);
    cookiesRepository.set("longitude", dataset.longitude);
  }

  function raiseCitySelectedEvent(dataset, element) {
    const citySelectedEvent = new CustomEvent("citySelected",  {bubbles: true, cancelable: true, detail: {
      name: dataset.name,
    }});
    element.dispatchEvent(citySelectedEvent);
  }

  function raiseRequestWeatherDataEvent(dataset, element) {
    let weatherEvent = new CustomEvent("requestWeatherData",  {bubbles: true, cancelable: true, detail: {
      latitude: dataset.latitude,
      longitude: dataset.longitude
    }});
    let proceed = element.dispatchEvent(weatherEvent); 

    if (proceed) {
      let eventToDispatch = new CustomEvent("swapPanel", {bubbles: true, detail: {angle: 0}});
      element.dispatchEvent(eventToDispatch);
    }
  }

})();
import * as utils from "$utils/_utils.js";

export function TodayTemperatureModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.updateTemperatureUnit = updateTemperatureUnit;
  model.valueElement = document.querySelector(".wp__temperature-value");
  model.unitElement = document.querySelector(".wp__temperature-unit");
  return model;

  function updateData(todayForecast) {
    if (todayForecast) {
      this.valueElement.innerText = todayForecast.maxTemperature;
      this.unitElement.innerText = todayForecast.temperatureUnits === "celsius" ? "°C" : "°F";
    }

    toggleLoaderFor(model);
  }
  
  function showLoader() {
    toggleLoaderFor(model);
  }

  function toggleLoaderFor(model) {
    model.valueElement.classList.toggle("loader");
  }

  function updateTemperatureUnit(unit) {
    const isCelsius = unit === "celsius";
    const newUnit = isCelsius ? "°C" : "°F";
    this.unitElement.innerText = newUnit;
    
    const oldValue = Number.parseFloat(this.valueElement.innerText);
    if (Number.isNaN(oldValue)) {
      return;
    }
    
    const newValue = isCelsius ? utils.getCelsius(oldValue) : utils.getFahrenheit (oldValue);
    this.valueElement.innerText = newValue;
  }
}
import { imageRepository } from "$lib/repositories/_image";
import { getFormattedDate } from "$utils/_utils";
import * as utils from "$utils/_utils.js";

export function DayForecastModel(builderConstructor, container, dayIndex) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();
    
  model.title = container.querySelector(".d_wf__day-forecast-title");
  setDate(model.title, dayIndex);
  
  model.updateTemperatureUnit = updateTemperatureUnit;
  model.img = container.querySelector(".d_wf__day-forecast-image");
  model.maxTemperature = container.querySelector(".d_wf__day-forecast-max-temperature");
  model.minTemperature = container.querySelector(".d_wf__day-forecast-min-temperature");
  model.units = container.querySelectorAll(".d_wf__day-forecast-unit");
  model.toggleLoader = toggleLoader;
  return model;

  function setDate(title, dayIndex) {
    let date = new Date(Date.now());
    date.setDate(date.getDate() + dayIndex);
    title.innerText = getFormattedDate(date);
  }

  function updateData(forecast) {
    this.toggleLoader();

    if (forecast) {
      this.img.src = imageRepository.getImageData(forecast.imageCode).image;
      this.maxTemperature.innerText = utils.getFormattedTemperature(forecast.maxTemperature, "celsius");
      this.minTemperature.innerText = utils.getFormattedTemperature(forecast.minTemperature, "celsius");;
    }
  }
  
  function showLoader() {
    this.toggleLoader();
  }

  function toggleLoader() {
    this.title.classList.toggle("loader");
    this.img.classList.toggle("loader");
    this.maxTemperature.classList.toggle("loader");
    this.minTemperature.classList.toggle("loader");
  }

  function updateTemperatureUnit(unit) {
    const oldMaxValue = Number.parseFloat(this.maxTemperature.innerText);
    const oldMinValue = Number.parseFloat(this.minTemperature.innerText);
    const isCelsius = unit === "celsius";
    const newMaxValue = isCelsius ? utils.getCelsius(oldMaxValue) : utils.getFahrenheit (oldMaxValue);
    const newMinValue = isCelsius ? utils.getCelsius(oldMinValue) : utils.getFahrenheit (oldMinValue);

    this.maxTemperature.innerText = utils.getFormattedTemperature(newMaxValue, unit);
    this.minTemperature.innerText = utils.getFormattedTemperature(newMinValue, unit);;
  }
}
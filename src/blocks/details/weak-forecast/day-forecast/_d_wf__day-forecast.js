import { imageRepository } from "$lib/repositories/_image";
import { getFormattedDate } from "$utils/_utils";
import { getFormattedTemperature } from "$utils/_utils";

export function DayForecastModel(builderConstructor, container, dayIndex) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();
    
  model.title = container.querySelector(".d_wf__day-forecast-title");
  setDate(model.title, dayIndex);
  
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

    this.img.src = imageRepository.getImageData(forecast.imageCode).image;
    this.maxTemperature.innerText = getFormattedTemperature(forecast.maxTemperature, "celsius");
    this.minTemperature.innerText = getFormattedTemperature(forecast.minTemperature, "celsius");;
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
}
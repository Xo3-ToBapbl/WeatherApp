import { imageRepository } from "$lib/repositories/_image";

export function TodayWeatherDescriptionModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.descriptionElement = document.querySelector(".wp__description");
  return model;

  function updateData(todayForecast) {
    this.descriptionElement.innerText = todayForecast.description;
    this.descriptionElement.classList.toggle("loader");
  }
  
  function showLoader() {
    this.descriptionElement.classList.toggle("loader");
    this.descriptionElement.innerText = "Loading...";
  }
}
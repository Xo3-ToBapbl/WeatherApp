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
    if (todayForecast) {
      this.descriptionElement.innerText = imageRepository.getImageData(todayForecast.imageCode).description;
    }
    
    toggleLoaderFor(this);
  }
  
  function showLoader() {
    toggleLoaderFor(this);
    this.descriptionElement.innerText = "Loading...";
  }

  function toggleLoaderFor(model) {
    model.descriptionElement.classList.toggle("loader");
  }
}
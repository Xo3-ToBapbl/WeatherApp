import { imageRepository } from "$lib/repositories/_image";

export function TodayWeatherImageModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.imgElement = document.querySelector(".wp__img");
  return model;

  function updateData(todayForecast) {
    if (todayForecast) {
      this.imgElement.src = imageRepository.getImageData(todayForecast.imageCode).image;
    }
    
    toggleLoaderFor(this);
  }
  
  function showLoader() {
    toggleLoaderFor(this);
  }

  function toggleLoaderFor(model) {
    model.imgElement.classList.toggle("loader");
  }
}
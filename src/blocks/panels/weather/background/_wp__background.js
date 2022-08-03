import { imageRepository } from "$lib/repositories/_image";

export function WeatherImageModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.imgElement = document.querySelector(".wp__img");
  return model;

  function updateData(todayForecast) {
    this.imgElement.src = imageRepository.getImage(todayForecast.description);
    this.imgElement.classList.toggle("loader");
  }
  
  function showLoader() {
    this.imgElement.classList.toggle("loader");
  }
}
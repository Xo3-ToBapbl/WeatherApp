export function TodayTemperatureModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.valueElement = document.querySelector(".wp__temperature-value");
  model.unitElement = document.querySelector(".wp__temperature-unit");
  return model;

  function updateData(todayForecast) {
    this.valueElement.innerText = todayForecast.maxTemperature;
    this.valueElement.classList.toggle("loader");
  }
  
  function showLoader() {
    this.imgElement.classList.toggle("loader");
  }
}
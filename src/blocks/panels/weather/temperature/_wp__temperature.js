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
    if (todayForecast) {
      this.valueElement.innerText = todayForecast.maxTemperature;
    }

    toggleLoaderFor(model);
  }
  
  function showLoader() {
    toggleLoaderFor(model);
  }

  function toggleLoaderFor(model) {
    model.valueElement.classList.toggle("loader");
  }
}
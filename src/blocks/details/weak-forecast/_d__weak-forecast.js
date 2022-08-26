import {DayForecastModel} from "./day-forecast/_d_wf__day-forecast";

export function WeekForecastModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.updateTemperatureUnit = updateTemperatureUnit;

  const forecastElements = document.querySelectorAll(".d_wf__day-forecast");
  model.forecastModels = [...forecastElements].map((element, index) => {
    return new DayForecastModel(builderConstructor, element, index + 1);
  });
  return model;

  function updateData() {
    const forecast = event.detail;
    this.forecastModels.forEach((model, index) => model.updateData(forecast[index + 1]));
  }
  
  function showLoader() {
    this.forecastModels.forEach((model) => model.showLoader());
  }

  function updateTemperatureUnit(unit) {
    this.forecastModels.forEach((model) => model.updateTemperatureUnit(unit));
  }
}
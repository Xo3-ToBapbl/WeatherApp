import "./toolbar/_wp__toolbar";
import {TodayWeatherImageModel} from "./background/_wp__background";
import {TodayTemperatureModel} from "./temperature/_wp__temperature";
import {TodayWeatherDescriptionModel} from "./description/_wp__description";
export {setTodayDate} from "./date/_wp__today-date";

export function WeatherPanelModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();
  
  model.innerModels = [
    new TodayWeatherImageModel(builderConstructor),
    new TodayTemperatureModel(builderConstructor),
    new TodayWeatherDescriptionModel(builderConstructor),
  ];

  return model;

  function updateData() {
    const forecasts = [...event.detail];
    const todayForecast = forecasts[0];
    this.innerModels.forEach((model) => model.updateData(todayForecast));
  }
  
  function showLoader() {
    this.innerModels.forEach((model) => model.showLoader());
  }
}
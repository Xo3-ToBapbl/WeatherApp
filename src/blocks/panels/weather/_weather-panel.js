import "./toolbar/_wp__toolbar.js";
import {WeatherImageModel} from "./background/_wp__background.js"

export function WeatherPanelModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();
  
  model.innerModels = [
    new WeatherImageModel(builderConstructor),
  ];

  return model;

  function updateData() {
    const forecasts = [...event.detail];
    const todayForecast = forecasts[0];
    this.innerModels.forEach((model) => model.updateData(todayForecast));
  }
  
  function showLoader() {
    console.log("weather panel loader showed");
  }
}
import "./toolbar/_wp__toolbar";
import {TodayWeatherImageModel} from "./background/_wp__background";
import {TodayTemperatureModel} from "./temperature/_wp__temperature";
import {TodayWeatherDescriptionModel} from "./description/_wp__description";
import {LocationModel} from "./location/_wp__location";
export {setTodayDate} from "./date/_wp__today-date";

export function WeatherPanelModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();
  
  model.updateLocation = updateLocation;
  model.locationModel = new LocationModel(builderConstructor);
  model.innerWeatherModels = [
    new TodayWeatherImageModel(builderConstructor),
    new TodayTemperatureModel(builderConstructor),
    new TodayWeatherDescriptionModel(builderConstructor),
  ];

  return model;

  function updateData() {
    const forecasts = [...event.detail];
    const todayForecast = forecasts[0];
    this.innerWeatherModels.forEach((model) => model.updateData(todayForecast));
  }

  function updateLocation(cityName) {
    this.locationModel.updateData(cityName);
  }
  
  function showLoader() {
    this.innerWeatherModels.forEach((model) => model.showLoader());
  }
}
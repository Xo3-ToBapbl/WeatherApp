import {dataModels} from "./data/_d_h__data";

export function HighlightsModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  const highlightsElements = document.querySelectorAll(".d_h__data");
  model.highlightsModels = [
    new dataModels.windStatusCtor(builderConstructor, highlightsElements[0]),
    new dataModels.humidityCtor(builderConstructor, highlightsElements[1]),
    new dataModels.visibilityCtor(builderConstructor, highlightsElements[2]),
    new dataModels.airPressureCtor(builderConstructor, highlightsElements[3]),
  ];
  return model;

  function updateData() {
    const forecast = event.detail;
    this.highlightsModels.forEach((model) => model.updateData(forecast[0]));
  }
  
  function showLoader() {
    this.highlightsModels.forEach((model) => model.showLoader());
  }
}
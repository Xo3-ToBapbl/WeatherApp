import "./toolbar/_wp__toolbar.js";

export function WeatherPanelModel(builder) {
  return builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  function updateData() {
    console.log("weather data updated");

    const forecast = event.detail;
  }
  
  function showLoader() {
    console.log("weather panel loader showed");
  }
}
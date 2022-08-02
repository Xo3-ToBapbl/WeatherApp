export const weatherService = {
  eventTarget: new EventTarget(),
  
  initialize() {
    return this.requestWeatherData();
  },
  
  requestWeatherData() {
    return new Promise.resolve([]);
  }
}
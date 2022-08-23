export const weatherService = (() => {
  const weatherData = [
    {
      maxTemperature: 15,
      minTemperature: 12,
      wind: 7,
      windDirection: "WDW",
      humidity: 65,
      visibility: 6.4,
      airPressure: 998,
      imageCode: "04d",
      date: "01.01.2022",
    },
    {
      maxTemperature: 16,
      minTemperature: 13,
      wind: 6,
      humidity: 64,
      windDirection: "WDW",
      visibility: 6.8,
      airPressure: 996,
      imageCode: "01d",
      date: "01.01.2022",
    },
    {
      maxTemperature: 12,
      minTemperature: 11,
      wind: 7,
      windDirection: "WDW",
      humidity: 65,
      visibility: 6.4,
      airPressure: 998,
      imageCode: "10d",
      date: "01.01.2022",
    },
    {
      maxTemperature: 14,
      minTemperature: 13,
      wind: 8,
      windDirection: "WDW",
      humidity: 60,
      visibility: 5.4,
      airPressure: 995,
      imageCode: "11d",
      date: "01.01.2022",
    },
    {
      maxTemperature: 17,
      minTemperature: 14,
      wind: 9,
      windDirection: "WDW",
      humidity: 58,
      visibility: 6.1,
      airPressure: 998,
      imageCode: "09d",
      date: "01.01.2022",
    },
    {
      maxTemperature: 15,
      minTemperature: 12,
      wind: 7,
      windDirection: "WDW",
      humidity: 65,
      visibility: 6.4,
      airPressure: 998,
      imageCode: "50d",
      date: "01.01.2022",
    },
  ];

  return {
    eventTarget: new EventTarget(),

    initialize() {
      this.requestWeatherData();
    },

    requestWeatherData() {
      setTimeout(() => {
        let eventToDispatch = new CustomEvent("weatherDataReceived", {detail: weatherData});
        this.eventTarget.dispatchEvent(eventToDispatch);
      }, 1000)
    }
  };
  
})();
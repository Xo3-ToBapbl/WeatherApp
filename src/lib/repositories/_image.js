export const imageRepository = (() => {
  const images = {};
  const imageMap = {
    "01d": {image:"clear", description:"Clear"},
    "01n": {image:"clear", description:"Clear"},
    "02d": {image:"light_cloud", description:"Light cloud"},
    "02n": {image:"light_cloud", description:"Light cloud"},
    "03d": {image:"heavy_cloud", description:"Heavy cloud"},
    "03n": {image:"heavy_cloud", description:"Heavy cloud"},
    "04d": {image:"heavy_cloud", description:"Heavy cloud"},
    "04n": {image:"heavy_cloud", description:"Heavy cloud"},
    "09d": {image:"heavy_rain", description:"Heavy rain"},
    "09n": {image:"heavy_rain", description:"Heavy rain"},
    "10d": {image:"light_rain", description:"Light rain"},
    "10n": {image:"light_rain", description:"Light rain"},
    "11d": {image:"thunderstorm", description:"Thunderstorm"},
    "11n": {image:"thunderstorm", description:"Thunderstorm"},
    "13d": {image:"snow", description:"Snow"},
    "13n": {image:"snow", description:"Snow"},
    "50d": {image:"sleet", description:"Sleet"},
    "50n": {image:"sleet", description:"Sleet"},
  };
  importAll(require.context("$images", false,  /\.(png|jpe?g|svg)$/));
  
  return {
    getImageData(code) {
      let imageData = {
        image:images[`./${imageMap[code].image}.png`],
        description:imageMap[code].description,
      };

      return imageData;
    },
  }

  function importAll(references) {
    references.keys().forEach((key) => (images[key] = references(key)));
  }
})();
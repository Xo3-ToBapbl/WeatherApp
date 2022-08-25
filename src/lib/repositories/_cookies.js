export const cookiesRepository = {
  getCachedModel() {
    return {
      cityName: cookiesRepository.get("cityName") ?? "London",
      placeId: cookiesRepository.get("placeId") ?? "ChIJdd4hrwug2EcRmSrV3Vo6llI",
      lat: cookiesRepository.get("lat") ?? 51.5072178,
      lng: cookiesRepository.get("lng") ?? -0.1275862,
    };
  },

  setCachedModel(model) {
    cookiesRepository.set("cityName", model.cityName);
    cookiesRepository.set("placeId", model.placeId);
    cookiesRepository.set("lat", model.lat);
    cookiesRepository.set("lng", model.lng);
  },

  get(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  set(name, value, options = {}) {
    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  },
  
  delete(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  },
}
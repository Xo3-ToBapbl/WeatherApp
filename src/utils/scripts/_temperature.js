export function getFormattedTemperature(value, units) {
  units = units == "fahrenheit" ? "°F" : "°C";
  return `${value} ${units}`;
}

export function getFahrenheit(value) {
  return Math.round((value * 9/5) + 32);
}

export function getCelsius(value) {
  return Math.round((value - 32) * 5/9);
}
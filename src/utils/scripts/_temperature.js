export function getFormattedTemperature(value, units) {
  units = units == "fahrenheit" ? "°F" : "°C";
  return `${value} ${units}`;
}
const weekday = ["Sun","Mon","Tue","Wed","Th","Fri","Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export function getFormattedDate(date) {
  return `${weekday[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}
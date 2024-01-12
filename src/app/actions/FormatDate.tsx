export function FormatDate (dateString: string) {
// Create a Date object
const dateObject = new Date(dateString);

// Format the date for display
const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

return new Intl.DateTimeFormat("en-US", options).format(dateObject);
}
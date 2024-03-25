export function formatDate(
  date: string | Date,
  format: "short" | "long",
  locales: string = "en-US"
): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: format,
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Date(date).toLocaleString(locales, options);
  return formattedDate;
}

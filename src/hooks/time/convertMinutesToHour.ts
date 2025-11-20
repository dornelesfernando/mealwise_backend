/**
 * Converts a duration in minutes to hours, with a maximum of two decimal places.
 * @param durationInMinutes The duration in minutes.
 * @returns The duration converted to hours, as a string.
 */
export function convertMinutesToHours(durationInMinutes: number): number {
  if (typeof durationInMinutes !== 'number' || durationInMinutes < 0) {
    return 0;
  }

  const hours = durationInMinutes / 60;
  const roundedHour = parseFloat(hours.toFixed(2));

  return roundedHour;
}

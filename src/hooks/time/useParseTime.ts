/**
 * Interface for the result of the time conversion hook.
 */
interface ParsedTime {
  isValid: boolean;
  hours: number | null;
  minutes: number | null;
}

/**
 * Converts a time string (in "HH:mm" format) into valid hours and minutes.
 * @param timeString The time string in "HH:mm" format.
 * @returns An object with the validation status and the hours/minutes.
 */
export function useParseTime(timeString: string): ParsedTime {
  if (!timeString || typeof timeString !== 'string') {
    return { isValid: false, hours: null, minutes: null };
  }

  const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
  if (!timeRegex.test(timeString)) {
    return { isValid: false, hours: null, minutes: null };
  }

  const [hoursStr, minutesStr] = timeString.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  return {
    isValid: true,
    hours: hours,
    minutes: minutes,
  };
}

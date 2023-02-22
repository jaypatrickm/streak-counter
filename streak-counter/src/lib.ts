import { Streak } from ".";
export const STREAK_KEY = "streak";
export function differenceInDays(from: string, to: string) { return  Math.floor((new Date(from).getTime() - new Date(to).getTime ()) / 86400000)}

export function formattedDate(date: Date): string {
  return date.toLocaleDateString("en-US")
}

export function shouldIncrementOrResetStreakCount(currentDate: Date, lastLoginDate: string): "increment" | "none" | "reset" {
  // We get 11/5/2021
  // so to get 5, we use our helper function
  const difference = differenceInDays(currentDate.toDateString(), lastLoginDate);
  if(difference === 0) {
    return "none"
  }
  // This means they logged in the day after the currentDate
  if(difference === 1) {
    return "increment"
  }

  // Otherwise they logged in after a day, which would
  // break the streak
  return "reset"
}

export function buildStreak(
  date: Date,
  overrideDefaults?: Partial<Streak>
): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  return {
    ...defaultStreak,
    ...overrideDefaults
  }
}
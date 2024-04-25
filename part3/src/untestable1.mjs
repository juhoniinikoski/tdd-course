// from course  material:

// code which reads the current time (e.g. using new Date()) is inherently untestable.
// instead, pass in the current time as a method parameter, or inject a clock
// which can be replaced with a fake clock in tests
export function daysUntilChristmas(today) {
  today.setHours(0, 0, 0);
  const currentYear = today.getFullYear();
  const christmasDay = new Date(currentYear, 11, 25); // 11 is December (months are 0-indexed)

  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(currentYear + 1);
  }

  const millisPerDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diffMillis = christmasDay.getTime() - today.getTime();

  return Math.floor(diffMillis / millisPerDay);
}

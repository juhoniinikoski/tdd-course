const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmasOld() {
  // From course  material:
  // Code which reads the current time (e.g. using new Date()) is inherently untestable.
  // Instead, pass in the current time as a method parameter, or inject a clock
  // which can be replaced with a fake clock in tests.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

export function daysUntilChristmas(today, christmasDay) {
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

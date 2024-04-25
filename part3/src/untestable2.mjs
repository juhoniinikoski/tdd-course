export function diceRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// randomness is impossible test so we pass the roll function
// as a prop and mock it in the tests.
export function diceHandValue(rollFunction) {
  const die1 = rollFunction(1, 6);
  const die2 = rollFunction(1, 6);
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}

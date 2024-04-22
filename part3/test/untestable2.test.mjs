import { describe, test, vi, beforeEach } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

vi.mock("../src/untestable2.mjs", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    diceRoll: vi.fn(),
  };
});

describe("Untestable 2: a dice game", () => {
  beforeEach(() => {
    diceRoll.mockReset();
  });

  test("Returns 100 + die value for one pair", () => {
    diceRoll.mockReturnValueOnce(3).mockReturnValueOnce(3);
    expect(diceHandValue(diceRoll)).toBe(103); // 100 + 3
  });

  test("Returns high die value for non-matching dice", () => {
    diceRoll.mockReturnValueOnce(2).mockReturnValueOnce(5);
    expect(diceHandValue(diceRoll)).toBe(5); // Max of 2 and 5
  });
});

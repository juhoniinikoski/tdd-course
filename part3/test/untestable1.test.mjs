import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("Days until Christmas in the future", () => {
    const today = new Date("2024-04-22");
    const christmasDay = new Date("2024-12-25");
    expect(daysUntilChristmas(today, christmasDay)).toBe(247);
  });

  test("Days until Christmas today", () => {
    const today = new Date("2024-12-25");
    const christmasDay = new Date("2024-12-25");
    expect(daysUntilChristmas(today, christmasDay)).toBe(0);
  });

  test("Days until Christmas in the past (next year)", () => {
    const today = new Date("2024-12-26");
    const christmasDay = new Date("2025-12-25");
    expect(daysUntilChristmas(today, christmasDay)).toBe(364);
  });

  test("Days until Christmas in the past (current year)", () => {
    const today = new Date("2024-12-26");
    const christmasDay = new Date("2024-12-25");
    expect(daysUntilChristmas(today, christmasDay)).toBe(364);
  });

  test("Days until Christmas in a leap year", () => {
    const today = new Date("2024-02-28"); // Last day of February in a leap year
    const christmasDay = new Date("2024-12-25");
    expect(daysUntilChristmas(today, christmasDay)).toBe(301);
  });
});

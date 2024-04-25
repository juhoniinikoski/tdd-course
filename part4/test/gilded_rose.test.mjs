import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("won't do anything if items is an empty array", () => {
    const items = [];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items).toEqual([]);
  });

  test("won't do anything if items aren't passed", () => {
    const shop = new Shop();
    shop.updateQuality();
    expect(shop.items).toEqual([]);
  });

  test("breaks if items has wrong type", () => {
    const items = ["test"];
    const shop = new Shop(items);
    let errorMsg = "";
    try {
      shop.updateQuality();
    } catch (e) {
      errorMsg = "detected";
    }

    expect(errorMsg).toEqual("detected");
  });

  test("should decrease quality by 1 for normal items", () => {
    const items = [new Item("Normal", 5, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(9);
  });

  test("should decrease quality by 1 for normal items where sellIn is 0", () => {
    const items = [new Item("Normal", 1, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(9);
  });

  test('should increase quality by 1 for "Aged Brie" items', () => {
    const items = [new Item("Aged Brie", 5, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(11);
  });

  test('should increase quality by 1 for "Backstage passes" items with more than 10 days left', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(11);
  });

  test('should increase quality by 2 for "Backstage passes" items with 10 days or less left', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(12);
  });

  test('should increase quality by 3 for "Backstage passes" items with 5 days or less left', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(13);
  });

  test('should increase quality by 4 for "Backstage passes" items with 6 days left', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(12);
  });

  test('should not change quality for "Sulfuras" items', () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(80);
  });

  test('should decrease sellIn by 1 for all items except "Sulfuras"', () => {
    const items = [
      new Item("Normal", 5, 10),
      new Item("Aged Brie", 5, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      new Item("Sulfuras, Hand of Ragnaros", 5, 10),
    ];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(4);
    expect(shop.items[1].sellIn).toBe(4);
    expect(shop.items[2].sellIn).toBe(4);
    expect(shop.items[3].sellIn).toBe(5); // Sulfuras should not change sellIn
  });

  test("should not decrease quality below 0 for normal items", () => {
    const items = [new Item("Normal", 5, 0)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  test('should not increase quality above 50 for "Aged Brie" items', () => {
    const items = [new Item("Aged Brie", 5, 50)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(50);
  });

  test('should not increase quality above 50 for "Backstage passes" items', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(50);
  });

  test('should not decrease quality below 0 for "Backstage passes" items after concert', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  test('should not change quality or sellIn for "Sulfuras" items', () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(80);
    expect(shop.items[0].sellIn).toBe(5);
  });

  test("should handle multiple items correctly", () => {
    const items = [
      new Item("Normal", 5, 10),
      new Item("Aged Brie", 5, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      new Item("Sulfuras, Hand of Ragnaros", 5, 10),
    ];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(9);
    expect(shop.items[1].quality).toBe(11);
    expect(shop.items[2].quality).toBe(13);
    expect(shop.items[3].quality).toBe(10); // Sulfuras should not change quality
    expect(shop.items[0].sellIn).toBe(4);
    expect(shop.items[1].sellIn).toBe(4);
    expect(shop.items[2].sellIn).toBe(4);
    expect(shop.items[3].sellIn).toBe(5); // Sulfuras should not change sellIn
  });

  test("should decrease quality by 2 for normal items when sellIn is less than 0 and name is not sulfuras...", () => {
    const items = [new Item("Normal", -1, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(8);
  });

  test("should decrease quality by 1 for normal items with quality greater than 0 when sellIn is less than 0", () => {
    const items = [new Item("Normal", -1, 1)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  test("should decrease quality by 1 for normal items with quality equal to 0 when sellIn is less than 0", () => {
    const items = [new Item("Normal", -1, 0)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  test('should not change quality for "Sulfuras" items when sellIn is less than 0', () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", -1, 80)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(80);
  });

  test('should increase quality by 2 for "Aged Brie" items when sellIn is less than 0', () => {
    const items = [new Item("Aged Brie", -1, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(12);
  });

  test('should increase quality by 1 for "Aged Brie" items with quality less than 50 when sellIn is less than 0', () => {
    const items = [new Item("Aged Brie", -1, 49)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(50);
  });

  test('should set quality to 0 for "Backstage passes" items when sellIn is less than 0', () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });
});

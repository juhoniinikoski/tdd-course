export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (this.isNormalItem(item)) {
        this.updateNormalItemQuality(item);
      } else if (this.isAgedBrie(item)) {
        this.updateAgedBrieQuality(item);
      } else if (this.isBackstagePass(item)) {
        this.updateBackstagePassQuality(item);
      } else if (this.isSulfuras(item)) {
        // Sulfuras never alters
        return;
      } else if (this.isConjuredItem(item)) {
        this.updateConjuredItemQuality(item);
      }
      this.updateSellIn(item);
    });

    return this.items;
  }

  updateNormalItemQuality(item) {
    let qualityChange = 1;
    if (item.sellIn < 0) {
      qualityChange *= 2; // Quality degrades twice as fast after sell by date
    }
    if (item.quality > 0) {
      item.quality -= qualityChange;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
  }

  updateAgedBrieQuality(item) {
    if (item.quality < 50) {
      item.quality++;
    }
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality++;
    }
  }

  updateBackstagePassQuality(item) {
    if (item.sellIn <= 0) {
      item.quality = 0; // Quality drops to 0 after concert
    } else if (item.quality < 50) {
      item.quality++;
      if (item.sellIn <= 10 && item.quality < 50) {
        item.quality++;
      }
      if (item.sellIn <= 5 && item.quality < 50) {
        item.quality++;
      }
    }
  }

  updateConjuredItemQuality(item) {
    let qualityChange = 2;
    if (item.sellIn < 0) {
      qualityChange *= 2; // Quality degrades twice as fast after sell by date
    }
    if (item.quality > 0) {
      item.quality -= qualityChange;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
  }

  updateSellIn(item) {
    if (!this.isSulfuras(item)) {
      item.sellIn--;
    }
  }

  // Helper methods for item type checking
  isNormalItem(item) {
    return (
      item.name !== "Aged Brie" &&
      item.name !== "Backstage passes to a TAFKAL80ETC concert" &&
      item.name !== "Sulfuras, Hand of Ragnaros" &&
      item.name !== "Conjured"
    );
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  isBackstagePass(item) {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  isSulfuras(item) {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  isConjuredItem(item) {
    return item.name === "Conjured";
  }
}

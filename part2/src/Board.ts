import { Block } from "./Block";
import { Shape } from "./Tetromino";
import { Element } from "./Element";

type Matrix = string[][];

export class Board implements Shape {
  width: number;
  height: number;
  matrix: Matrix = [];
  fallingBlock: Element | undefined;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.matrix = Array.from({ length: this.height }, () => ".".repeat(this.width).split(""));
  }

  drop(block: Shape | string) {
    if (this.fallingBlock) {
      throw new Error("already falling");
    }

    if (typeof block === "string") {
      block = new Block(block);
    }
    this.fallingBlock = new Element(block, 0, Math.floor((this.width - block.getWidth()) / 2));
  }

  getParts(y: number, x: number) {
    if (this.fallingBlock) {
      const points = Array.from(
        { length: this.fallingBlock!.getHeight() * this.fallingBlock!.getWidth() },
        (_, index) => {
          const row = Math.floor(index / this.fallingBlock!.getWidth()) + y;
          const col = (index % this.fallingBlock!.getWidth()) + x;
          if (this.fallingBlock!.getBlock(row, col) !== ".") {
            return [row, col];
          }
        }
      ).filter((point) => point !== undefined);

      return points;
    }

    return [];
  }

  tick() {
    if (!this.hasFalling()) return;

    const newElement = this.fallingBlock!.move();
    const newElementParts = this.getParts(newElement.y, newElement.x);

    let hitBottom = false;

    if (newElement.y === this.height || this.getBlock(newElement.y, this.fallingBlock!.x) !== ".") {
      for (let row = 0; row < this.getHeight(); row++) {
        for (let col = 0; col < this.getWidth(); col++) {
          this.matrix[row][col] = this.getBlock(row, col) ?? ".";
        }
      }
      hitBottom = true;
    }

    this.fallingBlock = hitBottom ? undefined : newElement;
  }

  hasFalling() {
    return !!this.fallingBlock;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getBlock(row: number, col: number) {
    if (this.fallingBlock) {
      const block = this.fallingBlock.getBlock(row, col);
      if (block !== ".") {
        return block;
      }
    }
    return this.matrix[row][col];
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.getHeight(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        s += this.getBlock(row, col);
      }
      s += "\n";
    }
    return s;
  }
}

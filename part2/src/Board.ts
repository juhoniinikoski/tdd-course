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

  tick() {
    if (!this.hasFalling()) return;

    if (
      this.fallingBlock!.y + 1 === this.height ||
      this.matrix[this.fallingBlock!.y + 1][this.fallingBlock!.x] !== "."
    ) {
      for (let row = 0; row < this.getHeight(); row++) {
        for (let col = 0; col < this.getWidth(); col++) {
          this.matrix[row][col] = this.getBlock(row, col) ?? ".";
        }
      }
      this.fallingBlock = undefined;
      return;
    }

    this.fallingBlock = this.fallingBlock!.move();
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

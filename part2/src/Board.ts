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

  getParts(element: Element) {
    const coords = [];
    const { x, y, shape } = element;
    const height = shape.getHeight();
    const width = shape.getWidth();

    for (let row = y; row < y + height; row++) {
      for (let col = x; col < x + width; col++) {
        const block = element.getBlock(row, col);
        if (block !== ".") {
          coords.push([row, col]);
        }
      }
    }

    return coords;
  }

  tick() {
    if (!this.hasFalling()) return;

    const newElement = this.fallingBlock!.move();
    const parts = this.getParts(newElement);

    let hitBottom = false;
    let hitAnother = false;

    for (const part of parts) {
      if (part[0] >= this.getHeight()) {
        hitBottom = true;
      }
    }

    for (const part of parts) {
      if (this.matrix[part[0]] && this.matrix[part[0]][part[1]] !== ".") {
        hitAnother = true;
      }
    }

    if (hitBottom || hitAnother) {
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

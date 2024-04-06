import { Block } from "./Block";
import { Shape } from "./Tetromino";
import { Element } from "./Element";

type Matrix = string[][];

export class Board {
  width: number;
  height: number;
  matrix: Matrix = [];
  fallingBlock: Element | undefined;
  fallingBlockPosition: [number, number] | undefined;

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
    this.fallingBlock = new Element(block, Math.floor((this.width - block.getWidth()) / 2), 0);
    this.fallingBlockPosition = [0, Math.floor(this.width / 2)];
    this.matrix[this.fallingBlockPosition[0]][this.fallingBlockPosition[1]] = block.getBlock(0, 0) ?? "";
  }

  tick() {
    if (!this.fallingBlockPosition) return;

    const [y, x] = this.fallingBlockPosition;

    if (y + 1 === this.height || this.matrix[y + 1][x] !== ".") {
      this.fallingBlock = undefined;
      this.fallingBlockPosition = undefined;
      return;
    }

    const block = this.matrix[y][x];
    this.matrix[y][x] = ".";
    this.matrix[y + 1][x] = block;
    this.fallingBlockPosition = [y + 1, x];
  }

  hasFalling() {
    return !!this.fallingBlock;
  }

  toString() {
    return this.matrix.map((row) => row.join("").concat("\n")).join("");
  }
}

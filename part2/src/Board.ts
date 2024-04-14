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
    let stop = false;

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
      stop = true;
    }

    this.fallingBlock = stop ? undefined : newElement;
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

  moveRight() {
    if (!this.hasFalling()) return;

    const newElement = this.fallingBlock!.moveRight();
    const parts = this.getParts(newElement);

    let hitRightWall = false;
    let hitAnother = false;
    let stop = false;

    for (const part of parts) {
      if (part[1] >= this.getWidth()) {
        hitRightWall = true;
      }
    }

    for (const part of parts) {
      if (this.matrix[part[0]] && this.matrix[part[0]][part[1]] !== ".") {
        hitAnother = true;
      }
    }

    stop = hitRightWall || hitAnother;
    this.fallingBlock = stop ? this.fallingBlock : newElement;
  }

  moveLeft() {
    if (!this.hasFalling()) return;

    const newElement = this.fallingBlock!.moveLeft();
    const parts = this.getParts(newElement);

    let hitLeftWall = false;
    let hitAnother = false;
    let stop = false;

    for (const part of parts) {
      if (part[1] < 0) {
        hitLeftWall = true;
      }
    }

    for (const part of parts) {
      if (this.matrix[part[0]] && this.matrix[part[0]][part[1]] !== ".") {
        hitAnother = true;
      }
    }

    stop = hitLeftWall || hitAnother;

    this.fallingBlock = stop ? this.fallingBlock : newElement;
  }

  moveDown() {
    this.tick();
  }

  rotateRight() {
    if (!this.hasFalling()) return;
    const newElement = this.fallingBlock!.rotateRight();
    const parts = this.getParts(newElement);

    let hitRightWall = false;
    let hitAnother = false;
    let stop = false;

    for (const part of parts) {
      if (part[1] >= this.getWidth()) {
        hitRightWall = true;
      }
    }

    for (const part of parts) {
      if (this.matrix[part[0]] && this.matrix[part[0]][part[1]] !== ".") {
        hitAnother = true;
      }
    }

    stop = hitRightWall || hitAnother;

    this.fallingBlock = stop ? this.fallingBlock : newElement;
  }

  rotateLeft() {
    if (!this.hasFalling()) return;
    const newElement = this.fallingBlock!.rotateLeft();
    const parts = this.getParts(newElement);

    let hitLeftWall = false;
    let hitAnother = false;
    let stop = false;

    for (const part of parts) {
      if (part[1] < 0) {
        hitLeftWall = true;
      }
    }

    stop = hitLeftWall || hitAnother;

    this.fallingBlock = stop ? this.fallingBlock : newElement;
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

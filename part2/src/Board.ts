import { Block } from "./Block";
import { Shape } from "./Tetromino";
import { Element } from "./Element";
import { Score } from "./Score";

type Matrix = string[][];

export class Board implements Shape {
  width: number;
  height: number;
  matrix: Matrix = [];
  fallingBlock: Element | undefined;
  score: Score;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.score = new Score();
    this.matrix = Array.from({ length: this.height }, () => ".".repeat(this.width).split(""));
  }

  private checkWalls(element: Element) {
    const parts = this.getParts(element);

    for (const part of parts) {
      if (part[0] >= this.getHeight() || part[1] >= this.getWidth() || part[0] < 0 || part[1] < 0) {
        return true;
      }
    }

    return false;
  }

  private checkAnotherElements(element: Element) {
    const parts = this.getParts(element);

    for (const part of parts) {
      if (this.matrix[part[0]] && this.matrix[part[0]][part[1]] !== ".") {
        return true;
      }
    }

    return false;
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

    let stop = false;

    const hitBottom = this.checkWalls(newElement);
    const hitAnother = this.checkAnotherElements(newElement);

    if (hitBottom || hitAnother) {
      for (let row = 0; row < this.getHeight(); row++) {
        for (let col = 0; col < this.getWidth(); col++) {
          this.matrix[row][col] = this.getBlock(row, col) ?? ".";
        }
      }
      stop = true;
    }

    if (stop) {
      this.clearLines();
    }

    this.fallingBlock = stop ? undefined : newElement;
  }

  clearLines() {
    const fullLines = [];
    for (let row = 0; row < this.getHeight(); row++) {
      if (this.matrix[row].every((cell) => cell !== ".")) {
        fullLines.push(row);
      }
    }
    for (const row of fullLines) {
      this.matrix.splice(row, 1);
      this.matrix.unshift(Array(this.getWidth()).fill("."));
    }
    this.score.update(fullLines.length as keyof Score["points"]);
  }

  getScore() {
    return this.score.getTotal();
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

    const hitRightWall = this.checkWalls(newElement);
    const hitAnother = this.checkAnotherElements(newElement);

    const stop = hitRightWall || hitAnother;

    this.fallingBlock = stop ? this.fallingBlock : newElement;
  }

  moveLeft() {
    if (!this.hasFalling()) return;

    const newElement = this.fallingBlock!.moveLeft();

    const hitLeftWall = this.checkWalls(newElement);
    const hitAnother = this.checkAnotherElements(newElement);

    const stop = hitLeftWall || hitAnother;

    this.fallingBlock = stop ? this.fallingBlock : newElement;
  }

  moveDown() {
    this.tick();
  }

  rotateRight() {
    if (!this.hasFalling()) return;
    const newElement = this.fallingBlock!.rotateRight();

    let hitRightWall = this.checkWalls(newElement);
    let hitAnother = this.checkAnotherElements(newElement);

    if (hitRightWall || hitAnother) {
      const newElement2 = this.fallingBlock!.moveLeft().rotateRight();
      let hitAnother = this.checkAnotherElements(newElement2);
      if (!hitAnother) {
        this.fallingBlock = newElement2;
      }
    }

    const stop = hitRightWall || hitAnother;

    this.fallingBlock = stop ? this.fallingBlock : newElement;
  }

  rotateLeft() {
    if (!this.hasFalling()) return;
    const newElement = this.fallingBlock!.rotateLeft();

    let hitLeftWall = this.checkWalls(newElement);
    let hitAnother = this.checkAnotherElements(newElement);

    if (hitLeftWall || hitAnother) {
      const newElement2 = this.fallingBlock!.moveRight().rotateLeft();
      let hitAnother = this.checkAnotherElements(newElement2);
      if (!hitAnother) {
        this.fallingBlock = newElement2;
      }
    }

    const stop = hitLeftWall || hitAnother;

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

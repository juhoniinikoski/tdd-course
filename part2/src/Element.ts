import { Shape } from "./Tetromino";

export class Element implements Shape {
  shape: Shape;
  y: number;
  x: number;

  constructor(shape: Shape, y: number, x: number) {
    this.shape = shape;
    this.y = y;
    this.x = x;
  }

  move() {
    return new Element(this.shape, this.y + 1, this.x);
  }

  moveLeft() {
    return new Element(this.shape, this.y, this.x - 1);
  }

  getHeight() {
    return this.y + this.shape.getHeight();
  }

  getWidth() {
    return this.x + this.shape.getWidth();
  }

  getBlock(y: number, x: number) {
    if (y >= this.y && y < this.getHeight() && x >= this.x && x < this.getWidth()) {
      return this.shape.getBlock(y - this.y, x - this.x);
    } else {
      return ".";
    }
  }
}

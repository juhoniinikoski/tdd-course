import { Shape } from "./Tetromino";

export class Element implements Shape {
  shape: Shape;
  x: number;
  y: number;

  constructor(shape: Shape, x: number, y: number) {
    this.shape = shape;
    this.x = x;
    this.y = y;
  }

  getHeight() {
    return this.shape.getHeight();
  }

  getWidth() {
    return this.shape.getWidth();
  }

  getBlock(y: number, x: number) {
    if (y >= this.y && y < this.getHeight() && x >= this.x && x < this.getWidth()) {
      return this.shape.getBlock(y - this.y, x - this.x);
    } else {
      return ".";
    }
  }
}

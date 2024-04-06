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

  getBlock(x: number, y: number) {
    return undefined;
  }
}

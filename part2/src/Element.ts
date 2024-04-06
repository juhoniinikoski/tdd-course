import { Shape } from "./Tetromino";

export class Element {
  shape: Shape;
  x: number;
  y: number;

  constructor(shape: Shape, x: number, y: number) {
    this.shape = shape;
    this.x = x;
    this.y = y;
  }
}

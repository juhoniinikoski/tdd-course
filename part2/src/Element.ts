import { RotatingShape } from "./RotatingShape";
import { Shape, shapeToString } from "./Tetromino";

export class Element implements Shape {
  shape: RotatingShape;
  y: number;
  x: number;

  constructor(shape: Shape, y: number, x: number) {
    const shapeString = shapeToString(shape);

    this.shape = RotatingShape.fromString(shapeString);
    this.y = y;
    this.x = x;
  }

  move() {
    return new Element(this.shape, this.y + 1, this.x);
  }

  moveRight() {
    return new Element(this.shape, this.y, this.x + 1);
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

  rotateRight() {
    return new Element(this.shape.rotateRight(), this.y - Math.floor(this.shape.getHeight() / 2), this.x);
  }

  getBlock(y: number, x: number) {
    if (y >= this.y && y < this.getHeight() && x >= this.x && x < this.getWidth()) {
      return this.shape.getBlock(y - this.y, x - this.x);
    } else {
      return ".";
    }
  }
}

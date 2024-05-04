import { Shape } from "./Tetromino";

export class RotatingShape implements Shape {
  width: number;
  height: number;
  shape: string[][];

  constructor(shapeString: string) {
    this.shape = shapeString
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
    this.width = this.shape[0].length;
    this.height = this.shape.length;
  }

  rotateRight() {
    const newShape = this.shape[0].map((_, i) => this.shape.map((row) => row[i]).reverse());
    return new RotatingShape(newShape.map((row) => row.join("")).join("\n"));
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  getBlock(y: number, x: number) {
    return this.shape[y][x];
  }

  toString() {
    return this.shape.map((row) => row.join("").concat("\n")).join("");
  }
}

import { RotatingShape } from "./RotatingShape";

const SHAPE_TYPES = {
  T: "T",
  I: "I",
  O: "O",
} as const;

export type ShapeType = (typeof SHAPE_TYPES)[keyof typeof SHAPE_TYPES];

export interface Shape {
  getWidth(): number;
  getHeight(): number;
  getBlock(y: number, x: number): string | undefined;
}

export function shapeToString(shape: Shape) {
  let s = "";
  for (let row = 0; row < shape.getHeight(); row++) {
    for (let col = 0; col < shape.getWidth(); col++) {
      s += shape.getBlock(row, col);
    }
    s += "\n";
  }
  return s;
}

export class Tetromino implements Shape {
  currentOrientation;
  orientations;
  shape;

  static T_SHAPE = Tetromino.fromString(
    0,
    4,
    `.T.
     TTT
     ...`
  );
  static I_SHAPE = Tetromino.fromString(
    0,
    2,
    `.....
     .....
     IIII.
     .....
     .....`
  );
  static O_SHAPE = Tetromino.fromString(
    0,
    1,
    `.OO
     .OO
     ...`
  );

  static fromString(currentOrientation: number, orientationCount: number, initialShape: string) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [shape, shape.rotateRight(), shape.rotateRight().rotateRight(), shape.rotateLeft()].slice(
      0,
      orientationCount
    );
    return new Tetromino(currentOrientation, orientations);
  }

  constructor(currentOrientation: number, orientations: RotatingShape[]) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.orientations = orientations;
    this.shape = orientations[this.currentOrientation];
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation + 1, this.orientations);
  }

  rotateLeft() {
    return new Tetromino(this.orientations.length - this.currentOrientation - 1, this.orientations);
  }

  getWidth() {
    return this.shape.width;
  }

  getHeight() {
    return this.shape.height;
  }

  getBlock(y: number, x: number) {
    return this.orientations[this.currentOrientation].getBlock(y, x);
  }

  toString() {
    return this.shape.toString();
  }
}

import { RotatingShape } from "./RotatingShape";
import { Shape as ShapeClass } from "./Shape";

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
  shapeType;

  static T_SHAPE = new Tetromino(ShapeClass.T_SHAPE.rotations[0], 0);
  static I_SHAPE = new Tetromino(ShapeClass.I_SHAPE.rotations[0], 0);
  static O_SHAPE = new Tetromino(ShapeClass.O_SHAPE.rotations[0], 0);

  constructor(shapeString: string, currentOrientation: number) {
    this.shapeType = this.getShapeType(shapeString);
    this.currentOrientation = currentOrientation;
    this.orientations = ShapeClass.getShapeByType(this.shapeType!).rotations.length;
    this.shape = new RotatingShape(
      ShapeClass.getRotation(ShapeClass.getShapeByType(this.shapeType!), this.currentOrientation)
    );
  }

  getShapeType(shapeString: string) {
    return ShapeClass.getAvailableShapes().find((shape) => shapeString.includes(shape));
  }

  rotateRight() {
    return new Tetromino(this.shape.toString(), (this.currentOrientation + 1) % this.orientations);
  }

  rotateLeft() {
    return new Tetromino(this.shape.toString(), (this.currentOrientation - 1 + this.orientations) % this.orientations);
  }

  getWidth() {
    return this.shape.width;
  }

  getHeight() {
    return this.shape.height;
  }

  getBlock(y: number, x: number) {
    return this.shape.getBlock(y, x);
  }

  toString() {
    return this.shape.toString();
  }
}

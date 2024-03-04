import { RotatingShape } from "./RotatingShape";

const SHAPE_TYPES = {
  T: "T",
  I: "I",
  O: "O",
} as const;

type ShapeType = (typeof SHAPE_TYPES)[keyof typeof SHAPE_TYPES];

export class Tetromino {
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

  static fromString(currentOrientation: any, orientationCount: number, initialShape: string) {
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
    this.shape = orientations[currentOrientation];
  }

  toString() {
    return this.shape.toString();
  }
}

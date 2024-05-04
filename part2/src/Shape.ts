const SHAPE_TYPES = {
  T: "T",
  I: "I",
  O: "O",
} as const;

export type ShapeType = (typeof SHAPE_TYPES)[keyof typeof SHAPE_TYPES];

interface ShapeItem {
  type: ShapeType;
  rotations: string[];
}

export class Shape {
  static T_SHAPE: ShapeItem = {
    type: SHAPE_TYPES.T,
    rotations: [
      `.T.
       TTT
       ...`,
      `.T.
       .TT
       .T.`,
      `TTT
       .T.
       ...`,
      `.T.
       TT.
       .T.`,
    ],
  };

  static I_SHAPE: ShapeItem = {
    type: SHAPE_TYPES.I,
    rotations: [
      `IIII`,
      `..I.
       ..I.
       ..I.
       ..I.`,
    ],
  };

  static O_SHAPE: ShapeItem = {
    type: SHAPE_TYPES.O,
    rotations: [
      `....
       .OO.
       .OO.
       ....`,
    ],
  };

  static getShapeByType(type: string) {
    const shapes = Object.fromEntries(Object.values(Shape).map((shape: ShapeItem) => [shape.type, shape]));
    return shapes[type];
  }

  static getAvailableShapes() {
    return Object.values(Shape).map((shape: ShapeItem) => shape.type);
  }

  static getRotation(shape: ShapeItem, rotation: number) {
    const rotations = shape.rotations.length;
    const normalizedRotation = ((rotation % rotations) + rotations) % rotations;
    return shape.rotations[normalizedRotation];
  }
}

export class RotatingShape {
  shape;

  static fromString(shape: string) {
    return new RotatingShape(
      shape
        .replaceAll(" ", "")
        .trim()
        .split("\n")
        .map((row) => row.split(""))
    );
  }

  constructor(shape: string[][]) {
    this.shape = shape;
  }

  toString() {
    return this.shape.map((row) => row.join("").concat("\n")).join("");
  }
}

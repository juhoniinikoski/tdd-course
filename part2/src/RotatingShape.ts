export class RotatingShape {
  width: number;
  height: number;
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
    this.width = shape[0].length;
    this.height = shape.length;
  }

  rotateRight() {
    this.shape = this.shape[0].map((_, i) => this.shape.map((row) => row[i]).reverse());
    return new RotatingShape(this.shape);
  }

  rotateLeft() {
    this.shape = this.shape.map((row, i) => row.map((_, j) => this.shape[j][i]).reverse());
    return new RotatingShape(this.shape);
  }

  toString() {
    return this.shape.map((row) => row.join("").concat("\n")).join("");
  }
}

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
    const size = this.shape.length;
    for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
        [this.shape[i][j], this.shape[j][i]] = [this.shape[j][i], this.shape[i][j]];
      }
    }

    for (let i = 0; i < size; i++) {
      this.shape[i].reverse();
    }
    return new RotatingShape(this.shape);
  }

  toString() {
    return this.shape.map((row) => row.join("").concat("\n")).join("");
  }
}

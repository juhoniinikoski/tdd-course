type Matrix = string[][];

export class Board {
  width;
  height;
  matrix: Matrix = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.matrix = Array.from({ length: this.height }, () => ".".repeat(this.width).split(""));
  }

  toString() {
    return this.matrix.map((row) => row.join("").concat("\n")).join("");
  }
}

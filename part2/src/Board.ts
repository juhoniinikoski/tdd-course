type Matrix = string[][];

export class Board {
  width: number;
  height: number;
  matrix: Matrix = [];
  fallingBlock: string | undefined;
  fallingBlockPosition: [number, number] | undefined;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.matrix = Array.from({ length: this.height }, () => ".".repeat(this.width).split(""));
  }

  drop(block: string) {
    this.fallingBlock = block;
    this.fallingBlockPosition = [0, Math.floor(this.width / 2)];
    this.matrix[this.fallingBlockPosition[0]][this.fallingBlockPosition[1]] = block;
  }

  toString() {
    return this.matrix.map((row) => row.join("").concat("\n")).join("");
  }
}

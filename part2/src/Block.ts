import { Shape } from "./Tetromino";

export class Block implements Shape {
  private width: number;
  private height: number;
  private symbol: string;

  constructor(symbol: string) {
    this.width = 1;
    this.height = 1;
    this.symbol = symbol;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getBlock(y: number, x: number) {
    if (x === 0 && y === 0) return this.symbol;
  }
}

export class Block {
  private width: number;
  private height: number;

  constructor() {
    this.width = 1;
    this.height = 1;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }
}

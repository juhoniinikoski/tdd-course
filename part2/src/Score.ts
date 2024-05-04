export class Score {
  total;
  points;

  constructor() {
    this.total = 0;
    this.points = {
      1: 50,
      2: 100,
      3: 300,
      4: 1200,
    };
  }

  update(linesCleared: keyof Score["points"]) {
    this.total += this.points[linesCleared];
  }

  getTotal() {
    return this.total;
  }
}

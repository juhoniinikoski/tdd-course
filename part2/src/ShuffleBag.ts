import { Tetromino } from "./Tetromino";

export class ShuffleBag {
  tetrominos: Tetromino[];
  currentTetromino: Tetromino | null;
  currentPosition: number;

  constructor() {
    this.tetrominos = [];
    this.currentTetromino = null;
    this.currentPosition = -1;
  }

  add(tetromino: Tetromino, amount: number) {
    for (let i = 0; i < amount; i++) {
      this.tetrominos.push(tetromino);
      this.currentPosition = this.tetrominos.length - 1;
    }
  }

  next() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.tetrominos.length - 1;
      this.currentTetromino = this.tetrominos[0];
      return this.tetrominos[0];
    }
    const position = Math.floor(Math.random() * this.currentPosition);
    this.currentTetromino = this.tetrominos[position];
    this.tetrominos[position] = this.tetrominos[this.currentPosition];
    this.tetrominos[this.currentPosition] = this.currentTetromino;
    this.currentPosition -= 1;
    return this.currentTetromino;
  }

  size() {
    return this.tetrominos.length;
  }
}

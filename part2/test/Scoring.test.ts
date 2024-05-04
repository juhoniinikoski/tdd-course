import { beforeEach, describe, test, expect } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Scoring works for", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let col = 0; col < 6; col++) {
      board.moveRight();
    }
  });

  test("one line", () => {
    for (let col = 0; col < 9; col++) {
      board.matrix[5][col] = "X";
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(50);
  });

  test("two lines", () => {
    for (let row = 4; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.matrix[row][col] = "X";
      }
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(100);
  });

  test("three lines", () => {
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.matrix[row][col] = "X";
      }
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(300);
  });

  test("four lines (Tetris)", () => {
    for (let row = 2; row < 6; row++) {
      for (let col = 0; col < 9; col++) {
        board.matrix[row][col] = "X";
      }
    }
    expect(board.getScore()).to.equal(0);
    board.tick();
    board.tick();
    board.tick();
    expect(board.getScore()).to.equal(1200);
  });
});

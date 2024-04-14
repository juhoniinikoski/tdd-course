import { beforeEach, describe, expect, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Falling rotating tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("Falling tetromino can be rotated right (T-shape)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("Falling tetromino can be rotated right (I-shape)", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });

  test("Falling tetromino can be rotated right (O-shape)", () => {
    board.drop(Tetromino.O_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ....OO....
       ....OO....
       ..........
       ..........
       ..........`
    );
  });

  test("Cannot be rotated when there is no room to rotate (T-shape) due to wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `.........T
       ........TT
       .........T
       ..........
       ..........
       ..........`
    );
  });

  test.skip("Performs wall kick");
});

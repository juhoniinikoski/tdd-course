import { beforeEach, describe, expect, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Moving tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("Can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );

    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..T.......
       .TTT......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );

    board.moveRight();

    expect(board.toString()).to.equalShape(
      `......T...
       .....TTT..
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("Cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
    }

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveRight();
    }

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("Cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
      board.moveDown();
    }
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) {
      board.moveDown();
    }
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T..T.....
       TTTTTT....`
    );
  });

  test("Cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveRight();
      board.moveDown();
    }
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) {
      board.moveDown();
    }
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....T..T.
       ....TTTTTT`
    );
  });

  test("Cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }

    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });
});

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
  });
  test.skip("Can be moved down", () => {});
  test.skip("Cannot be moved left beyond the board", () => {});
  test.skip("Cannot be moved right beyond the board", () => {});
  test.skip("Cannot be moved down beyond the board (will stop falling)", () => {});
  test.skip("Cannot be moved left through other blocks", () => {});
  test.skip("Cannot be moved right through other blocks", () => {});
  test.skip("Cannot be moved down through other blocks (will stop falling)", () => {});
});

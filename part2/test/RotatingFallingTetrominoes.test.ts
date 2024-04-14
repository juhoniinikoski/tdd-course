import { beforeEach, describe, expect, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Falling rotating tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("Falling tetromino can be rotated", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
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

  test.skip("Cannot be rotated when there is no room to rotate");
  test.skip("Performs wall kick");
});

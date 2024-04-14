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

  test("Falling tetromino can be rotated left (T-shape)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("Falling tetromino can be rotated left (I-shape)", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........`
    );
  });

  test("Cannot be rotated right when there is no room to rotate (T-shape) due to wall", () => {
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

  test("Cannot be rotated right when there is no room to rotate (I-shape) due to wall", () => {
    board.drop(Tetromino.I_SHAPE);
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
      `..........
       .........I
       .........I
       .........I
       .........I
       ..........`
    );
  });

  test("Cannot be rotated right when there is no room to rotate (O-shape) due to wall", () => {
    board.drop(Tetromino.O_SHAPE);
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
      `........OO
       ........OO
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Cannot be rotated left when there is no room to rotate (T-shape) due to wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `T.........
       TT........
       T.........
       ..........
       ..........
       ..........`
    );
  });

  test("Cannot be rotated right when there is no room to rotate (T-shape) due to another element", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.tick();
    board.tick();
    board.moveRight();
    board.moveRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......T...
       .....TTOO.
       ......TOO.`
    );
  });

  test.skip("Performs wall kick");
});

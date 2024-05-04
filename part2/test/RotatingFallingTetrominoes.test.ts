import { beforeEach, describe, expect, test } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

const moveToBottom = (board: Board) => {
  board.moveDown();
  board.moveDown();
  board.moveDown();
  board.moveDown();
  board.moveDown();
  board.moveDown();
  board.moveDown();
};

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
      `...I......
       ...I......
       ...I......
       ...I......
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
      `...I......
       ...I......
       ...I......
       ...I......
       ..........
       ..........`
    );
  });

  test("Cannot be rotated right when there is no room to rotate (T-shape) due to another element", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    moveToBottom(board);

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
       .....T....
       ....TTTOO.
       .......OO.`
    );
  });

  test("Performs wall kick when there is no room to rotate left normally due to another element (T-shape)", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    board.tick();
    board.tick();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...T......
       OOTTT.....
       OO........`
    );
  });

  test("Performs wall kick when there is no room to rotate right normally due to wall (T-shape)", () => {
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
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Performs wall kick when there is no room to rotate left normally due to wall (T-shape)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Won't perform right wall kick if there is no room between element and wall", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .T........
       TTOO......
       .TOO......`
    );
  });

  test("Won't perform right wall kick if there is no room between element and wall", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ........T.
       ......OOTT
       ......OOT.`
    );
  });

  test("Won't perform left wall kick if there is no room between element and wall", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .T........
       TTOO......
       .TOO......`
    );
  });

  test("Won't perform left wall kick if there is no room between element and wall", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ........T.
       ......OOTT
       ......OOT.`
    );
  });

  test("Won't perform right wall kick if there is no room between two elements", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    moveToBottom(board);

    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ..OOTTOO..
       ..OOT.OO..`
    );
  });

  test("Won't perform left wall kick if there is no room between two elements", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    moveToBottom(board);

    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    moveToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ..OOTTOO..
       ..OOT.OO..`
    );
  });
});

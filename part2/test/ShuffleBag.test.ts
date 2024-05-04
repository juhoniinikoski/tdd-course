import { beforeEach, describe, test, expect } from "vitest";
import { Tetromino } from "../src/Tetromino";
import { ShuffleBag } from "../src/ShuffleBag";

describe("Shuffle bag", () => {
  const tetrominoes = [Tetromino.I_SHAPE, Tetromino.O_SHAPE, Tetromino.T_SHAPE];
  const amount = 10;

  let shuffleBag: ShuffleBag;
  beforeEach(() => {
    shuffleBag = new ShuffleBag();
    tetrominoes.forEach((tetromino) => {
      shuffleBag.add(tetromino, amount);
    });
  });

  test("is empty before tetrominoes are added", () => {
    expect(new ShuffleBag().size()).to.equal(0);
  });

  test("has the correct total number of tetrominoes", () => {
    expect(shuffleBag.size()).to.equal(tetrominoes.length * amount);
  });

  test("returns all possible tetrominoes", () => {
    const returnedTetrominoes = [];
    for (let i = 0; i < tetrominoes.length * amount; i++) {
      returnedTetrominoes.push(shuffleBag.next());
    }
    expect(new Set(returnedTetrominoes).size).to.equal(tetrominoes.length);
    expect(returnedTetrominoes).to.have.members(tetrominoes.flatMap((tetromino) => Array(amount).fill(tetromino)));
  });

  test("returns supported tetrominoes in a random order", () => {
    const returnedTetrominoes = [];
    for (let i = 0; i < tetrominoes.length * amount; i++) {
      returnedTetrominoes.push(shuffleBag.next());
    }
    expect(returnedTetrominoes).not.to.equal(tetrominoes.flatMap((tetromino) => Array(amount).fill(tetromino)));
  });
});

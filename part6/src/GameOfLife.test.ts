import { describe, expect, it } from "vitest";
import { GameOfLife } from "./GameOfLife";
import fs from "fs";

const readPatternFile = (path: string) => {
  return fs.readFileSync(path, "utf8");
};

describe("game of life", () => {
  it("initializes grid on construction", () => {
    const game = new GameOfLife();

    const grid = game.getGrid();

    expect(grid.getHeight()).toEqual(3);
    expect(grid.getWidth()).toEqual(3);
  });

  it("reads rle files successfully (blinker)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/blinker.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(3);
  });

  it("reads rle files successfully (block)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/block.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(4);
  });

  it("reads rle files successfully (glider)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/glider.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(5);
  });

  it("reads rle files successfully (gosper glider gun)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(
      __dirname + "/../patterns/gosper-glider-gun.rle"
    );

    game.fromRle(pattern);

    const grid = game.getGrid();
    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(36);
  });

  it("evolves correctly by 1 set (blinker)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/blinker.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();

    let cell1 = grid.getCell(1, 2);
    let cell2 = grid.getCell(2, 2);
    let cell3 = grid.getCell(0, 2);

    expect(cell1.isAlive).toEqual(true);
    expect(cell2.isAlive).toEqual(false);
    expect(cell3.isAlive).toEqual(false);

    game.evolve(1);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(3);

    cell1 = grid.getCell(1, 2);
    cell2 = grid.getCell(2, 2);
    cell3 = grid.getCell(0, 2);

    expect(cell1.isAlive).toEqual(true);
    expect(cell2.isAlive).toEqual(true);
    expect(cell3.isAlive).toEqual(true);
  });

  it("evolves correctly by 1 set (glider)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/glider.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    game.evolve(1);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(5);
  });

  it("evolves correctly by 1 set (block)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/block.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    game.evolve(1);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(4);
  });

  it("evolves correctly by 1 set (gosper-glider-gun)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(
      __dirname + "/../patterns/gosper-glider-gun.rle"
    );

    game.fromRle(pattern);

    const grid = game.getGrid();
    game.evolve(1);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(39);
  });

  it("evolves correctly by 20 set (blinker)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/blinker.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();

    game.evolve(10);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(3);
  });

  it("evolves correctly by 20 set (glider)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/glider.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    game.evolve(10);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(5);
  });

  it("evolves correctly by 20 set (block)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(__dirname + "/../patterns/block.rle");

    game.fromRle(pattern);

    const grid = game.getGrid();
    game.evolve(20);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(4);
  });

  it("evolves correctly by 20 set (gosper-glider-gun)", () => {
    const game = new GameOfLife();
    const pattern = readPatternFile(
      __dirname + "/../patterns/gosper-glider-gun.rle"
    );

    game.fromRle(pattern);

    const grid = game.getGrid();
    game.evolve(20);

    const aliveCellsCount = grid.getAliveCellsCount();

    expect(aliveCellsCount).toEqual(54);
  });
});

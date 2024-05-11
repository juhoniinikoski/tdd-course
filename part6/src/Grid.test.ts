import { describe, expect, it } from "vitest";
import { Grid } from "./Grid";

describe("grid basic methods", () => {
  it("initializes grid correctly", () => {
    const grid = new Grid(3, 4);

    expect(grid.getHeight()).toEqual(4);
    expect(grid.getWidth()).toEqual(3);
  });

  it("returns a single cell", () => {
    const grid = new Grid(3, 3);
    const cell = grid.getCell(1, 2);

    expect(cell).toEqual({ x: 2, y: 1, isAlive: false });
  });

  it("initializes isAlive value for each cell to false", () => {
    const grid = new Grid(3, 3);

    const gridHeight = grid.getHeight();
    const gridWidth = grid.getWidth();

    for (let row = 0; row < gridHeight; row++) {
      for (let col = 0; col < gridWidth; col++) {
        const cell = grid.getCell(row, col);
        expect(cell.isAlive).toEqual(false);
      }
    }
  });

  it("adds alive cell successfully", () => {
    const grid = new Grid(3, 3);

    const initial = grid.getCell(1, 1);
    expect(initial.isAlive).toEqual(false);

    grid.addCell(1, 1);

    const result = grid.getCell(1, 1);
    expect(result.isAlive).toEqual(true);
  });

  it("returns alive cells count successfully", () => {
    const grid = new Grid(3, 3);

    const initial = grid.getAliveCellsCount();
    expect(initial).toEqual(0);

    grid.addCell(1, 1);
    grid.addCell(1, 2);

    const result = grid.getAliveCellsCount();
    expect(result).toEqual(2);
  });

  it("returns alive neighbors successfully", () => {
    const grid = new Grid(3, 3);

    grid.addCell(1, 1);

    const initial = grid.getAliveNeighborCellsCount(1, 1);
    expect(initial).toEqual(0);

    grid.addCell(1, 2);

    const result = grid.getAliveNeighborCellsCount(1, 1);
    expect(result).toEqual(1);
  });

  it("returns alive neighbors successfully (on every side)", () => {
    const grid = new Grid(4, 4);

    grid.addCell(2, 2);

    const initial = grid.getAliveNeighborCellsCount(2, 2);
    expect(initial).toEqual(0);

    grid.addCell(1, 1);
    grid.addCell(1, 2);
    grid.addCell(1, 3);
    grid.addCell(2, 1);
    grid.addCell(2, 3);
    grid.addCell(3, 1);
    grid.addCell(3, 2);
    grid.addCell(3, 3);

    const result = grid.getAliveNeighborCellsCount(2, 2);
    expect(result).toEqual(8);
  });
});

describe("evolve grid", () => {
  it("cell stays alive if it has 2 neighbors", () => {
    const grid = new Grid(6, 6);

    grid.addCell(2, 2);
    const initial = grid.getCell(2, 2);
    expect(initial.isAlive).toEqual(true);

    grid.addCell(1, 2);
    grid.addCell(2, 1);

    grid.evolve();

    const result = grid.getCell(2, 2);
    expect(result.isAlive).toEqual(true);
  });

  it("dead cell becomes alive if it has 3 neighbors", () => {
    const grid = new Grid(6, 6);

    const initial = grid.getCell(2, 2);
    expect(initial.isAlive).toEqual(false);

    grid.addCell(1, 2);
    grid.addCell(2, 1);
    grid.addCell(2, 3);

    grid.evolve();

    const result = grid.getCell(2, 2);
    expect(result.isAlive).toEqual(true);
  });
});

describe("resize the grid", () => {
  it("resizes the grid successfully and keeps items on place", () => {
    const grid = new Grid(3, 3);

    const initialHeight = grid.getHeight();
    const initialWidth = grid.getWidth();

    expect(initialHeight).toEqual(3);
    expect(initialWidth).toEqual(3);

    grid.addCell(0, 2);
    grid.addCell(2, 2);

    grid.resize();

    const resultHeight = grid.getHeight();
    const resultWidth = grid.getWidth();

    expect(resultHeight).toEqual(initialHeight + 2);
    expect(resultWidth).toEqual(initialWidth + 2);

    // const cell1 = grid.getCell(0, 2);
    // expect(cell1.isAlive).toEqual(true);

    // const cell2 = grid.getCell(2, 2);
    // expect(cell2.isAlive).toEqual(true);
  });
});

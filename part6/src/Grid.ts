interface Cell {
  y: number;
  x: number;
  isAlive: boolean;
}

export class Grid {
  private grid: Cell[][];

  constructor(width: number, height: number) {
    this.grid = this.initializeGrid(width, height);
  }

  private initializeGrid(width: number, height: number) {
    const cells: Cell[][] = [];

    for (let row = 0; row < height; row++) {
      cells[row] = [];
      for (let col = 0; col < width; col++) {
        const cell: Cell = {
          x: col,
          y: row,
          isAlive: false,
        };

        cells[row][col] = cell;
      }
    }

    return cells;
  }

  public getHeight() {
    return this.grid.length;
  }

  public getWidth() {
    return this.grid[0].length;
  }

  public getCell(row: number, col: number) {
    return this.grid[row][col];
  }

  public getAliveCellsCount() {
    let count = 0;
    for (let row = 0; row < this.getHeight(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        const alive = this.getCell(row, col).isAlive;
        if (alive) {
          count++;
        }
      }
    }
    return count;
  }

  public getAliveNeighborCellsCount(row: number, col: number) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        const rowToCheck = row + i;
        const colToCheck = col + j;

        const checkCell =
          rowToCheck >= 0 &&
          rowToCheck < this.getHeight() &&
          colToCheck >= 0 &&
          colToCheck < this.getWidth();

        if (checkCell && this.getCell(rowToCheck, colToCheck).isAlive) {
          count++;
        }
      }
    }
    return count;
  }

  public addCell(row: number, col: number) {
    this.grid[row][col].isAlive = true;
  }

  public evolve() {
    const newGrid: Cell[][] = [];

    for (let row = 0; row < this.getHeight(); row++) {
      newGrid[row] = [];
      for (let col = 0; col < this.getWidth(); col++) {
        const aliveNeighborsCount = this.getAliveNeighborCellsCount(row, col);
        const currentCell = this.getCell(row, col);
        const currentAlive = currentCell.isAlive;

        if (
          (currentAlive &&
            (aliveNeighborsCount === 2 || aliveNeighborsCount === 3)) ||
          (!currentAlive && aliveNeighborsCount === 3)
        ) {
          newGrid[row][col] = { ...currentCell, isAlive: true };
        } else {
          newGrid[row][col] = { ...currentCell, isAlive: false };
        }
      }
    }

    this.grid = newGrid;
  }

  public resize() {
    let minRow: number = 0;
    let minCol: number = 0;
    let maxRow: number = 0;
    let maxCol: number = 0;

    for (let row = 0; row < this.getHeight(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        const cell = this.getCell(row, col);

        if (cell.isAlive) {
          if (row < minRow) minRow = row;
          if (col < minCol) minCol = col;
          if (col > maxCol) maxCol = col;
          if (row > maxRow) maxRow = row;
        }
      }
    }

    const newHeight = maxRow - minRow + 3;
    const newWidth = maxCol - minCol + 3;
    const newCells = this.initializeGrid(newWidth, newHeight);

    for (let row = 0; row < this.getHeight(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        const existingCell = this.getCell(row, col);
        if (existingCell.isAlive) {
          newCells[row][col].isAlive = true;
        }
      }
    }

    this.grid = newCells;
  }
}

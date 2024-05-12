import { Grid } from "./Grid";

export class GameOfLife {
  private grid: Grid;

  constructor() {
    this.grid = new Grid(3, 3);
  }

  public getGrid(): Grid {
    return this.grid;
  }

  public fromRle(pattern: string) {
    const lines = pattern.split("\n").filter((l) => !l.includes("#"));
    const geometry = lines[0]
      .split(",")
      .slice(0, 2)
      .map((value) => Number(value.match(/\d+/)));

    const width = geometry[0];
    const height = geometry[1];

    const gridPattern = lines.slice(1);

    this.grid = new Grid(width + 2, height + 2);

    let index = 0;
    let row = 1;
    let col = 1;
    let run = 0;

    const joinedPattern = gridPattern.join("");

    while (joinedPattern.charAt(index) !== "!") {
      const character = joinedPattern.charAt(index);

      switch (character) {
        case "$":
          row += run || 1;
          col = 1;
          run = 0;
          break;
        case "b":
          col += run || 1;
          run = 0;
          break;
        case "o":
          if (run === 0) {
            this.grid.addCell(row, col);
            col++;
          } else {
            while (run !== 0) {
              this.grid.addCell(row, col);
              col++;
              run--;
            }
          }
          break;
        default:
          const parsed = parseInt(character);
          const num = isNaN(parsed) ? 0 : parsed;
          run = 10 * run + num;
          break;
      }

      index++;
    }
  }

  public evolve(num: number) {
    let index = 0;
    while (index < num) {
      this.grid.evolve();
      this.grid.resize();
      index++;
    }
  }

  public toRle() {
    return "This program is too dumb to return result in rle format.";
  }
}

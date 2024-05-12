import { GameOfLife } from "./GameOfLife";
import { readFileSync } from "fs";

const inputFile = process.argv[2];
const generations = process.argv[3];

const pattern = readRleFile(inputFile);

const game = new GameOfLife();

game.fromRle(pattern);
game.evolve(Number(inputFile));

console.log(game.toRle());

function readRleFile(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}

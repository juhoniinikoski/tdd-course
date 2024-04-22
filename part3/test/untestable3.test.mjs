import { describe, test, beforeEach, expect, afterEach } from "vitest";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import { writeFile, rm, mkdir } from "fs/promises";
import { join } from "path";

// Helper function to create a temporary directory
async function createTempDir() {
  const tempDir = join(__dirname, ".", "temp");
  await mkdir(tempDir, { recursive: true });
  return tempDir;
}

// Helper function to write a CSV file with given content
async function writeCsvFile(filePath, content) {
  await writeFile(filePath, content, { encoding: "utf8" });
}

describe("parsePeopleCsv function", () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await createTempDir();
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  test("Parses CSV with valid data", async () => {
    const csvContent = `John,Doe,30,Male\nJane,Doe,25,Female`;
    const csvFilePath = join(tempDir, "test.csv");

    // Write the CSV file
    await writeCsvFile(csvFilePath, csvContent);

    // Call the parsePeopleCsv function
    const records = await parsePeopleCsv(csvFilePath);

    // Assert the parsed records
    expect(records).toEqual([
      { firstName: "John", lastName: "Doe", age: 30, gender: "m" },
      { firstName: "Jane", lastName: "Doe", age: 25, gender: "f" },
    ]);
  });

  test("Handles empty CSV file", async () => {
    const csvFilePath = join(tempDir, "empty.csv");
    await writeCsvFile(csvFilePath, "");

    const records = await parsePeopleCsv(csvFilePath);

    expect(records).toEqual([]);
  });

  test("Handles CSV with empty age propert", async () => {
    const csvContent = `\nJohn,Doe,,Male\n\nJane,Doe,25,Female\n`;
    const csvFilePath = join(tempDir, "empty_age.csv");
    await writeCsvFile(csvFilePath, csvContent);

    const records = await parsePeopleCsv(csvFilePath);

    expect(records).toEqual([
      { firstName: "John", lastName: "Doe", gender: "m" },
      { firstName: "Jane", lastName: "Doe", age: 25, gender: "f" },
    ]);
  });

  test("Handles CSV with empty lines", async () => {
    const csvContent = `\nJohn,Doe,30,Male\n\nJane,Doe,25,Female\n\n`;
    const csvFilePath = join(tempDir, "empty_lines.csv");
    await writeCsvFile(csvFilePath, csvContent);

    const records = await parsePeopleCsv(csvFilePath);

    expect(records).toEqual([
      { firstName: "John", lastName: "Doe", age: 30, gender: "m" },
      { firstName: "Jane", lastName: "Doe", age: 25, gender: "f" },
    ]);
  });
});

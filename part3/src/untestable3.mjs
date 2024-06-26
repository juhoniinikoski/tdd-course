import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

// from the course material:

// the file system is a global variable which persists between test executions.
// If a test needs to write to the disk, create a unique temporary directory on test setup
// and delete it recursively on teardown.
export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

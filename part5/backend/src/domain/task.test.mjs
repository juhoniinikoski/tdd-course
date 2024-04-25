import { describe, it } from "vitest";

describe("create", () => {
  it.todo("creates new task successfully");
});

describe("list", () => {
  it.todo("returns all tasks successfully");
  it.todo("returns an empty array if there are no tasks");
});

describe("rename", () => {
  it.todo("renames task successfully");
  it.todo("keeps the old name if there is no need for update");
  it.todo("throws an error if no task with given id is found");
});

describe("complete", () => {
  it.todo("completes task successfully");
  it.todo("throws an error if no task with given id is found");
});

describe("archive", () => {
  it.todo("archives task succesfully");
  it.todo("throws an error if task with given id is not found");
});

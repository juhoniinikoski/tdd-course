import { describe, it, beforeEach, expect } from "vitest";
import { db } from "../utils/db";
import { task } from "./task.sql";
import { Task } from "./task.js";
import { createId } from "@paralleldrive/cuid2";

const mockTasks = [
  { id: createId(), title: "task1", completed: false, archived: false },
  { id: createId(), title: "task2", completed: false, archived: false },
];

describe("create", () => {
  beforeEach(async () => {
    await db.delete(task).execute();
    await db.insert(task).values(mockTasks).execute();
  });

  it("creates new task successfully", async () => {
    await Task.create("task123");

    const result = await db.select().from(task).execute();
    const resultItem = result.find((item) => item.title === "task123");

    expect(resultItem!.title).toEqual("task123");
    expect(resultItem!.completed).toEqual(false);
    expect(resultItem!.archived).toEqual(false);
  });
});

describe("list", () => {
  beforeEach(async () => {
    await db.delete(task).execute();
    await db.insert(task).values(mockTasks).execute();
  });

  it("returns all tasks successfully", async () => {
    const result = await Task.list();
    result.forEach((r) => expect(mockTasks.map((t) => t.title).includes(r.title)).toEqual(true));
  });

  it("returns an empty array if there are no tasks", async () => {
    await db.delete(task).execute();
    const result = await Task.list();
    expect(result).toEqual([]);
  });
});

describe("rename", () => {
  beforeEach(async () => {
    await db.delete(task).execute();
    await db.insert(task).values(mockTasks).execute();
  });

  it("renames task successfully", async () => {
    const initial = await db.select().from(task).execute();
    expect(initial.filter((i) => i.title === "new title").length).toEqual(0);
    await Task.rename(mockTasks[0].id, "new title");

    const result = await db.select().from(task).execute();
    expect(result.filter((i) => i.title === "new title").length).toEqual(1);
  });

  it("throws an error if no task with given id is found", async () => {
    await expect(Task.rename("testtest", "new title")).rejects.toThrowError("Task with given id is not found.");
  });
});

describe("complete", () => {
  beforeEach(async () => {
    await db.delete(task).execute();
    await db.insert(task).values(mockTasks).execute();
  });

  it("completes task successfully", async () => {
    const initial = await db.select().from(task).execute();
    expect(initial.find((i) => i.id === mockTasks[0].id)!.completed).toEqual(false);

    await Task.complete(mockTasks[0].id);

    const result = await db.select().from(task).execute();
    expect(result.find((i) => i.id === mockTasks[0].id)!.completed).toEqual(true);
  });

  it("throws an error if no task with given id is found", async () => {
    await expect(Task.complete("testtest")).rejects.toThrowError("Task with given id is not found.");
  });
});

describe("archive", () => {
  beforeEach(async () => {
    await db.delete(task).execute();
    await db.insert(task).values(mockTasks).execute();
  });

  it("archives task succesfully", async () => {
    const initial = await db.select().from(task).execute();
    expect(initial.find((i) => i.id === mockTasks[0].id)!.archived).toEqual(false);

    await Task.archive(mockTasks[0].id);

    const result = await db.select().from(task).execute();
    expect(result.find((i) => i.id === mockTasks[0].id)!.archived).toEqual(true);
  });

  it("throws an error if task with given id is not found", async () => {
    await expect(Task.archive("testtest")).rejects.toThrowError("Task with given id is not found.");
  });
});

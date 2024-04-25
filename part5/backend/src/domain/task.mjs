import { task } from "./task.sql.mjs";
import { createId } from "@paralleldrive/cuid2";
import { db } from "../utils/db.mjs";
import { eq } from "drizzle-orm";

export * as Task from "./task";

export async function create(title) {
  const newTask = { id: createId(), title, completed: false, archived: false };
  const result = await db.insert(task).values(newTask).returning();
  return result;
}

export async function list() {
  const result = await db.select().from(task).execute();
  return result;
}

export async function rename(taskID, title) {
  const result = await db
    .update(task)
    .set({
      title,
    })
    .where(eq(task.id, taskID))
    .returning();

  if (!result.length) {
    throw new Error("Task with given id is not found.");
  }

  return result;
}

export async function complete(taskID) {
  const result = await db
    .update(task)
    .set({
      completed: true,
    })
    .where(eq(task.id, taskID))
    .returning();

  if (!result.length) {
    throw new Error("Task with given id is not found.");
  }

  return result;
}

export async function archive(taskID) {
  const result = await db
    .update(task)
    .set({
      archived: true,
    })
    .where(eq(task.id, taskID))
    .returning();

  if (!result.length) {
    throw new Error("Task with given id is not found.");
  }

  return result;
}

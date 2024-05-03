import { task } from "./task.sql";
import { createId } from "@paralleldrive/cuid2";
import { db } from "../utils/db";
import { and, eq } from "drizzle-orm";

export * as Task from "./task";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  archived: boolean;
}

export async function create(title: string): Promise<Task> {
  const newTask = { id: createId(), title, completed: false, archived: false };
  const result = await db.insert(task).values(newTask).returning().execute();
  return result[0];
}

export async function list(): Promise<Task[]> {
  const result = await db.select().from(task).execute();
  return result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function rename(taskID: string, title: string): Promise<Task> {
  const result = await db
    .update(task)
    .set({
      title,
    })
    .where(eq(task.id, taskID))
    .returning()
    .execute();

  if (!result.length) {
    throw new Error("Task with given id is not found.");
  }

  return result[0];
}

export async function complete(taskID: string): Promise<Task> {
  const initial = await db.select().from(task).where(eq(task.id, taskID)).execute();

  if (!initial.length) {
    throw new Error("Task with given id is not found.");
  }

  const result = await db
    .update(task)
    .set({
      completed: !initial[0].completed,
    })
    .where(eq(task.id, taskID))
    .returning()
    .execute();

  return result[0];
}

export async function archive(taskID: string): Promise<Task> {
  const result = await db
    .update(task)
    .set({
      archived: true,
    })
    .where(eq(task.id, taskID))
    .returning()
    .execute();

  if (!result.length) {
    throw new Error("Task with given id is not found.");
  }

  return result[0];
}

export async function archiveCompleted(): Promise<Task[]> {
  const result = await db
    .update(task)
    .set({
      archived: true,
    })
    .where(and(eq(task.completed, true), eq(task.archived, false)))
    .returning()
    .execute();

  return result;
}

export async function deleteAll(): Promise<void> {
  await db.delete(task).execute();
}

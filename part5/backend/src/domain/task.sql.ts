import { char, pgTable, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

export const task = pgTable("task", {
  id: char("id", { length: 24 }).primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  completed: boolean("completed").notNull(),
  archived: boolean("archived").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

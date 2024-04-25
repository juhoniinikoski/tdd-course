import { char, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("task", {
  id: char("id", { length: 24 }).primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
});

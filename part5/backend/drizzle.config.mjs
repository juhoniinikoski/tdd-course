import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export default {
  out: "./migrations/",
  schema: "./src/**/*.sql.mjs",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};

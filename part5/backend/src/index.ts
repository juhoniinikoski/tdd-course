import express from "express";
import { z } from "zod";
import { Task } from "./domain/task";
import cors from "cors";

const PORT = 80;

const CreateTaskSchema = z.object({
  title: z.string(),
});

const RenameTaskSchema = z.object({
  taskID: z.string(),
  newTitle: z.string(),
});

const ArchiveTaskSchema = z.object({
  taskID: z.string(),
});

const CompleteTaskSchema = z.object({
  taskID: z.string(),
});

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello from backend");
});

app.get("/api/tasks", async (req, res) => {
  const result = await Task.list();
  return res.json(result);
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = CreateTaskSchema.parse(req.body);
    const result = await Task.create(title);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.put("/api/tasks/rename", async (req, res) => {
  try {
    const { taskID, newTitle } = RenameTaskSchema.parse(req.body);
    const result = await Task.rename(taskID, newTitle);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.put("/api/tasks/archive", async (req, res) => {
  try {
    const { taskID } = ArchiveTaskSchema.parse(req.body);
    const result = await Task.archive(taskID);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.put("/api/tasks/complete", async (req, res) => {
  try {
    const { taskID } = CompleteTaskSchema.parse(req.body);
    const result = await Task.complete(taskID);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.put("/api/tasks/archive-completed", async (req, res) => {
  try {
    const result = await Task.archiveCompleted();
    res.json(result);
  } catch (error) {
    res.status(400).send();
  }
});

// expose this only for test container
if (process.env.DATABASE_URL?.includes("db-test:5432/test")) {
  app.get("/api/init", async (req, res) => {
    try {
      await Task.deleteAll();
      res.status(200).send();
    } catch (error) {
      res.status(400).send();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

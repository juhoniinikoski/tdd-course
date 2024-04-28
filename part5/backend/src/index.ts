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

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.get("/tasks", async (req, res) => {
  const result = await Task.list();
  return res.json(result);
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = CreateTaskSchema.parse(req.body);
    const result = await Task.create(title);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.put("/tasks/rename", async (req, res) => {
  try {
    const { taskID, newTitle } = RenameTaskSchema.parse(req.body);
    const result = await Task.rename(taskID, newTitle);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.put("/tasks/archive", async (req, res) => {
  try {
    const { taskID } = ArchiveTaskSchema.parse(req.body);
    const result = await Task.archive(taskID);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

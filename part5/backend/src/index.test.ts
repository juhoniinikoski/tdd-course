import { vi, describe, it, expect } from "vitest";
import { app } from ".";
import supertest from "supertest";
import { createId } from "@paralleldrive/cuid2";

const api = supertest(app);

const mockTasks = [
  { id: createId(), title: "task1", completed: false, archived: false },
  { id: createId(), title: "task2", completed: false, archived: false },
];

const { mockCreate, mockRename, mockList, mockArchive } = vi.hoisted(() => {
  return {
    mockCreate: vi.fn(),
    mockRename: vi.fn(),
    mockList: vi.fn(),
    mockArchive: vi.fn(),
  };
});

vi.mock("./domain/task", () => {
  return {
    Task: {
      create: mockCreate,
      rename: mockRename,
      list: mockList,
      archive: mockArchive,
    },
  };
});

describe("get tasks", () => {
  it("calls task domain function successfully and returns list of tasks with statuscode 200", async () => {
    mockList.mockImplementationOnce(() => Promise.resolve(mockTasks[0]));
    const res = await api.get("/api/tasks");
    expect(mockList).toBeCalledTimes(1);
    expect(res.status).toEqual(200);
  });
});

describe("create task", () => {
  it("calls task domain function successfully and returns the created task with statuscode 200", async () => {
    mockCreate.mockImplementationOnce(() => Promise.resolve(mockTasks[0]));
    const res = await api.post("/api/tasks").send({ title: "test-title" });
    expect(mockCreate).toBeCalledTimes(1);
    expect(res.status).toEqual(200);
  });

  it("returns 400 if user inputs invalid body", async () => {
    const res = await api.post("/api/tasks").send({ test: "unknown-key" });
    expect(res.status).toEqual(400);
  });
});

describe("rename task", () => {
  it("calls task domain function successfully and returns the renamed task with statuscode 200", async () => {
    mockRename.mockImplementationOnce(() => Promise.resolve(mockTasks[0]));
    const res = await api.put("/api/tasks/rename").send({ taskID: mockTasks[0].id, newTitle: "test-title" });
    expect(mockRename).toBeCalledTimes(1);
    expect(res.status).toEqual(200);
  });

  it("returns 400 if user inputs invalid body", async () => {
    const res = await api.put("/api/tasks/rename").send({ test: "unknown-key" });
    expect(res.status).toEqual(400);
  });
});

describe("archive task", () => {
  it("calls task domain function successfully and returns the archived task with statuscode 200", async () => {
    mockArchive.mockImplementationOnce(() => Promise.resolve(mockTasks[0]));
    const res = await api.put("/api/tasks/archive").send({ taskID: mockTasks[0].id });
    expect(mockArchive).toBeCalledTimes(1);
    expect(res.status).toEqual(200);
  });

  it("returns 400 if user inputs invalid body", async () => {
    const res = await api.put("/api/tasks/archive").send({ test: "unknown-key" });
    expect(res.status).toEqual(400);
  });
});

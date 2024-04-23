import { beforeAll, beforeEach, describe, test, expect } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { connectTestDb, createMockUsers, createTables, dropTables, truncateTables } from "./utils";

describe("Untestable 4: enterprise application", () => {
  let service;
  let userDao;
  let db;
  let mockUsers;

  beforeAll(async () => {
    db = await connectTestDb();
    await dropTables(db);
    await createTables(db);
  });

  beforeEach(async () => {
    userDao = new PostgresUserDao(db);
    service = new PasswordService(userDao);
    await truncateTables(db);
    mockUsers = await createMockUsers(db);
  });

  test("returns user successfully by id", async () => {
    const result = await userDao.getById(mockUsers[0].userId);
    expect(result).toEqual(mockUsers[0]);
  });

  test("returns null if user with given id is not found", async () => {
    const result = await userDao.getById(1);
    expect(result).toEqual(null);
  });

  test("creates a new user successfully", async () => {
    const user = { userId: 123, passwordHash: "hashhash" };

    const initial = await userDao.getById(user.userId);
    expect(initial).toEqual(null);

    await userDao.save(user);

    const result = await userDao.getById(user.userId);
    expect(result).toEqual(user);
  });

  test("changes user password successfully", async () => {
    const initial = await userDao.getById(mockUsers[0].userId);
    await service.changePassword(initial.userId, "password1", "newPassword1");
    const result = await userDao.getById(mockUsers[0].userId);
    expect(initial.passwordHash).not.toEqual(result.passwordHash);
  });

  test("throws an error if old password is incorrect", async () => {
    await expect(service.changePassword(mockUsers[0].userId, "testtest")).rejects.toThrowError("wrong old password");
  });
});

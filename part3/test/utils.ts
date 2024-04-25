import util from "node:util";
import child_process from "node:child_process";
import pg from "pg";
import { readFileSync } from "fs";
import argon2 from "@node-rs/argon2";

const exec = util.promisify(child_process.exec);

async function dockerComposePort(service, privatePort) {
  const result = await exec(`docker compose port ${service} ${privatePort}`);
  const [host, port] = result.stdout.trim().split(":");
  return { host, port };
}

async function dockerComposeEnv(service) {
  const ps = await exec(`docker compose ps --quiet ${service}`);
  const containerId = ps.stdout.trim();

  const inspect = await exec(`docker inspect ${containerId}`);
  const env = JSON.parse(inspect.stdout)[0].Config.Env;
  return env
    .map((s) => s.split("="))
    .reduce((m, [k, v]) => {
      m[k] = v;
      return m;
    }, {});
}

export async function connectTestDb() {
  const service = "db";
  const privatePort = "5432";
  // supports dynamic port mapping on the host à la "127.0.0.1::5432"
  const { host, port } = await dockerComposePort(service, privatePort);
  const env = await dockerComposeEnv(service);
  return new pg.Pool({
    host,
    port,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_USER,
  });
}

export async function createTables(db) {
  await db.query(readFileSync("./src/create-tables.sql", { encoding: "utf8", flag: "r" }));
}

export async function dropTables(db) {
  await db.query(readFileSync("./src/drop-tables.sql", { encoding: "utf8", flag: "r" }));
}

export async function createMockUsers(db) {
  const passwordHash1 = await argon2.hash("password1");
  const passwordHash2 = await argon2.hash("password2");

  await db.query(
    `insert into users (user_id, password_hash)
     values ($1, $2)
     on conflict (user_id) do update
         set password_hash = excluded.password_hash`,
    [123456, passwordHash1],
  );

  await db.query(
    `insert into users (user_id, password_hash)
     values ($1, $2)
     on conflict (user_id) do update
         set password_hash = excluded.password_hash`,
    [234567, passwordHash2],
  );

  return [
    { userId: 123456, passwordHash: passwordHash1 },
    { userId: 23457, passwordHash: passwordHash2 },
  ];
}

export async function truncateTables(db) {
  await db.query("truncate users");
}

import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../entities/*.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts, js}`],
  // logging: true,
  // logger: "advanced-console",
});

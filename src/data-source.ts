import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRESDB_HOST,
  port: Number(process.env.POSTGRESDB_DOCKER_PORT),
  username: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_ROOT_PASSWORD,
  database: process.env.POSTGRESDB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

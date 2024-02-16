import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

import { schema } from './utils';

import * as dotenv from 'dotenv';
dotenv.config();

const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/dto/**/*.ts'],
  migrations: ['src/db-migrations/**/*.ts'],
};

export const dataSource = new DataSource({
  ...connectionOptions,
});

async function runMigrations() {
  await dataSource.initialize();
  await dataSource.query(`SET search_path TO '${schema}'`);

  await dataSource.runMigrations({
    transaction: 'all',
  });
  await dataSource.destroy();
}

runMigrations();

import { DataSource } from 'typeorm';

require('dotenv').config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['./**/*.entity.ts'],
  migrations: ['./**/migrations/*.ts'],
});

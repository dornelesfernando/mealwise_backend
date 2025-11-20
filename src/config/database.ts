import { Dialect, Options } from 'sequelize';

interface IConfig {
  [key: string]: Options;
}

const dbConfig: IConfig = {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as Dialect,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    timezone: '-03:00',
  },
  test: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as Dialect,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    logging: false,
    timezone: '-03:00',
  },
  production: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as Dialect,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    logging: false,
    timezone: '-03:00',
  },
};

export default dbConfig;

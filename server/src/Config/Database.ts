import { Sequelize } from 'sequelize';

const DB_HOST = process.env.DB_HOST         || '127.0.0.1';
const DB_NAME = process.env.DB_NAME         || 'edgecomputing';
const DB_USER = process.env.DB_USER         || 'edgecomputing';
const DB_PASS = process.env.DB_PASS || 'edgecomputing';

const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres'
});

export default database;

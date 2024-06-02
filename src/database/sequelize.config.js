require('ts-node/register');
const configs = require("../config/database");

module.exports = {
  username: configs.DB_USERNAME,
  password: configs.DB_PASSWORD,
  database: configs.DB_NAME,
  host: configs.DB_HOST,
  dialect: 'postgres',
  port: 5432
};
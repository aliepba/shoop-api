import { Sequelize } from 'sequelize';
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } from '../config/database';

let sequelizeConnection: Sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: 5432, 
});

export default sequelizeConnection;
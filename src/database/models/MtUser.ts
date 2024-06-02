import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import bcrypt from 'bcrypt';

export interface UserAttributes{
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  token: string;
  createdAt?: string,
  updatedAt?: string
}

class MtUser extends Model<UserAttributes>{}

MtUser.init(
  {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        const hashedPass = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPass);
      }
    },
    role: {
      type: DataTypes.STRING
    },
    token: {
      type : DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    },
  },
  {
    sequelize: connection,
    tableName: 'mt_users'
  }
)

export default MtUser;
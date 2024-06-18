'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface ProductCategoryAttributes{
  id: number,
  name: string,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string
}

class MtProductCategory extends Model<ProductCategoryAttributes>{}

MtProductCategory.init(
  {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    name : {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE
    }
  },
  {
    sequelize : connection,
    tableName: 'mt_product_categories',
    paranoid: true,
  }
)

export default MtProductCategory
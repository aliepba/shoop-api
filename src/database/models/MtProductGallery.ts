'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface ProductGalleryAttributes{
  id: number,
  productId: number,
  file: string,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string
}

class MtProductGallery extends Model<ProductGalleryAttributes>{}

MtProductGallery.init(
  {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    productId : {
      allowNull: false,
      field : 'product_id',
      type : DataTypes.INTEGER
    },
    file: {
      allowNull: false,
      type : DataTypes.STRING 
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
    tableName: 'mt_product_galleries',
    paranoid: true,
  }
)

export default MtProductGallery
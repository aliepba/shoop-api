"use strict"

import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import MtProductCategory, { ProductCategoryAttributes } from './MtProductCategory';
import MtProductGallery, { ProductGalleryAttributes } from './MtProductGallery';

export interface ProductAttributes{
  id: number,
  name: string,
  price: number,
  description: string,
  tags: string,
  categoryId: number,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string,
  category?: ProductCategoryAttributes,
  galleries?: ProductGalleryAttributes[] 
}

class MtProduct extends Model<ProductAttributes>{}

MtProduct.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    name : {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price : {
      allowNull: false,
      type : DataTypes.DECIMAL
    },
    description : {
      allowNull: false,
      type: DataTypes.TEXT
    },
    tags : {
      allowNull: false,
      type: DataTypes.STRING
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.NUMBER,
      field: 'category_id'
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
    tableName : 'mt_products',
    paranoid: true,
  }
)

MtProduct.hasOne(MtProductCategory, {foreignKey: 'id', sourceKey: 'categoryId', as : 'category'})
MtProduct.hasMany(MtProductGallery, {foreignKey: 'productId', sourceKey: 'id', as : 'galleries'})

export default MtProduct



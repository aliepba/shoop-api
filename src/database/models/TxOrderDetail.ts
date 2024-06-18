"use strict"

import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface OrderDetailAttributes{
  id: number,
  userId: number,
  productId: number,
  orderId: number,
  quantity: number,
  price: number,
  totalPrice: number,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string
}

class TxOrderDetail extends Model<OrderDetailAttributes>{}

TxOrderDetail.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    userId : {
      allowNull: false,
      type: DataTypes.BIGINT,
      field: 'user_id'
    },
    orderId : {
      allowNull: false,
      type: DataTypes.BIGINT,
      field: 'order_id'
    },
    productId : {
      allowNull: false,
      type: DataTypes.BIGINT,
      field: 'product_id'
    },
    quantity : {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price : {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    totalPrice: {
      field: "total_price",
      allowNull: false,
      type : DataTypes.DECIMAL
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
    tableName: 'tx_order_details',
    paranoid: true,
  }
)

export default TxOrderDetail
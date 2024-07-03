"use strict"

import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import TxOrderDetail, { OrderDetailAttributes } from './TxOrderDetail';
import { UserAttributes } from './MtUser';

export interface OrderAttributes{
  id: number,
  userId?: any,
  address: string,
  payment: string,
  totalPrice: number,
  shippingPrice : number,
  grandTotal: number,
  status: string, 
  details?: OrderDetailAttributes[],
  user? : UserAttributes,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string
}

class TxOrder extends Model<OrderAttributes>{}

TxOrder.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    userId: {
      allowNull: false,
      field: 'user_id',
      type: DataTypes.NUMBER
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    payment: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    totalPrice: {
      field: 'total_price',
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    shippingPrice: {
      field: 'shipping_price',
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    grandTotal : {
      field : 'grand_total',
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    status: {
      allowNull: false,
      defaultValue: 'PENDING',
      type: DataTypes.ENUM('PENDING', 'SUCCESS', 'PAYMENT', 'SHIPPING', 'CANCEL')
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
    },
  },
  {
    sequelize : connection,
    tableName : 'tx_orders',
    paranoid: true,
  }
)

TxOrder.hasMany(TxOrderDetail, {foreignKey: 'orderId', sourceKey: 'id', as: 'details'})

export default TxOrder

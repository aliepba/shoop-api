'use strict';
import { QueryInterface, DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('tx_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.BIGINT,
        field : 'user_id',
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment: {
        type : Sequelize.STRING,
        allowNull: false
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        field : 'total_price',
        allowNull: false
      },
      shippingPrice : {
        type : Sequelize.DECIMAL,
        field: 'shipping_price',
        allowNull: false
      },
      grandTotal : {
        type: Sequelize.DECIMAL,
        field: 'grand_total'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'SUCCESS', 'PAYMENT', 'SHIPPING', 'CANCEL'),
        allowNull: false,
        defaultValue: "PENDING"
      },
      created_at: {
        allowNull: false,
        field : 'created_at',
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      },
      deleted_at : {
        allowNull: true,
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('tx_orders');
  }
};
'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('tx_order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      product_id :{
        type : Sequelize.BIGINT
      },
      order_id : {
        type : Sequelize.BIGINT
      },
      quantity : {
        type : Sequelize.INTEGER
      },
      price : {
        type : Sequelize.DECIMAL
      },
      total_price :{
        type: Sequelize.DECIMAL,
        allowNull: true
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
    await queryInterface.dropTable('tx_order_details');
  }
};
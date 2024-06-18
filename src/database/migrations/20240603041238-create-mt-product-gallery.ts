'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('mt_product_galleries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.BIGINT,
        field : 'product_id',
        allowNull: false
      },
      file: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('MtProductGalleries');
  }
};
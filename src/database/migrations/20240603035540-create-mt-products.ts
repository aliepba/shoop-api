'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('mt_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      description: {
        type : Sequelize.TEXT,
        allowNull: true
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true
      },
      categoryId :{
        type: Sequelize.BIGINT,
        field: 'category_id',
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
    await queryInterface.dropTable('MtProducts');
  }
};
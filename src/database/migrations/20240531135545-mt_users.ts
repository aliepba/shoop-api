// 'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('mt_users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name : {
        type: Sequelize.STRING,
        allowNull: false
      },
      email : {
        type: Sequelize.STRING,
        allowNull: false
      },
      password : {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone : {
        type: Sequelize.STRING,
        allowNull: true
      },
      role : {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : 'user'
      },
      token : {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull: false
      },
      updated_at : {
        type : Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('mt_users', {
      type: 'unique',
      fields : ['email'],
      name : 'UNIQUE_USERS_EMAIL'
    })
  },

  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('mt_users');
  }
};

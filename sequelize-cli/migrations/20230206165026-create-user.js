'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      _isAdmin: {
        type: Sequelize.INTEGER(2),
        allowNull: true,
      },
      _isActive: {
        type: Sequelize.INTEGER(2),
        allowNull: true,
      },
      _token: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      _lastLogin: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      _created_At: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
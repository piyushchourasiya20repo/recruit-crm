'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(40),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      contact_number: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isIn: [[1, 2]],
          comment: 'for Male : 1 , for Female : 2',
        },
        defaultValue: null,
      },
      specialization: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null,
      },
      work_ex_year: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: null,
      },
      candidate_dob: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      skills: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_on: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      updated_on: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('candidates');
  }
};
'use strict';

/ @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    
        return queryInterface.bulkInsert('user', [
            {
                name: 'piyush',
                email: 'piyushchourasiya20@gmail.com',
                password: '$2b$10$NzSDwzml07ugkBttH6MMqeMaqQJ6i7//lK6tM4tLY9FFsjbqyP5gO',
                _createdAt: 'January 31th 2023, 1:16:17 pm',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user', null, {});
    },
};
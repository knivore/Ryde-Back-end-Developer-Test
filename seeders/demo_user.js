'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Users', [
            {
                email: 'chinkeh@hotmail.com',
                password: 'password',
                username: 'Knivore',
                first_name: 'Chin Leong',
                last_name: 'Keh',
                gender: 'M',
                date_of_birth: null,
                created_date: new Date(),
                created_by: 'SEED',
                updated_date: new Date(),
                updated_by: 'SEED',
            },
            {
                email: 'keh.p4nc4k3@gmail.com',
                password: 'password',
                username: 'Pancake',
                first_name: 'Chin Leong',
                last_name: 'Keh',
                gender: 'M',
                date_of_birth: null,
                created_date: new Date(),
                created_by: 'SEED',
                updated_date: new Date(),
                updated_by: 'SEED',
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};

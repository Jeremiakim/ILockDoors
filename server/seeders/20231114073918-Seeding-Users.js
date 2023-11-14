"use strict";

const { hashPassword } = require("../helpers/bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/users.json");
    const user = data.map((el) => {
      delete el.id, (el.createdAt = new Date());
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
      return el;
    });
    await queryInterface.bulkInsert("Users", user, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", user, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Campaigns", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "on going",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Campaigns", "status");
  },
};

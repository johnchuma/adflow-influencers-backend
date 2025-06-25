"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Campaigns", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      targetAudience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      budget: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      includeTesting: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      objectives: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      deliverables: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      requirements: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Campaigns");
  },
};

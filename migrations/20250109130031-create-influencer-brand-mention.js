"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("InfluencerBrandMentions", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      brandLogo: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      brandName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mentions: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      effectiveness: {
        type: DataTypes.DOUBLE,
        allowNull: true,
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
    await queryInterface.dropTable("InfluencerBrandMentions");
  },
};

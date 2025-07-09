'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ClientDetails', {
        id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: true,
      },
       company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       profileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      minBudget:{
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
       maxBudget:{
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ClientDetails');
  }
};
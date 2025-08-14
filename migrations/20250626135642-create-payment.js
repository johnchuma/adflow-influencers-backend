'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Payments', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status:{
        type: DataTypes.ENUM("PENDING","COMPLETED"),
        defaultValue:"PENDING"
      },
      campaignInfluencerId:{
        type: DataTypes.UUID,
        allowNull:false,
        unique:true
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
    await queryInterface.dropTable('Payments');
  }
};
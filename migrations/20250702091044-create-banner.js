'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Banners', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaignInfluencerId:{
         type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
       status:{
        type:DataTypes.STRING,
        defaultValue:"PENDING"
      },
      rejectionReason:{
        type:DataTypes.TEXT("long"),
        allowNull:true
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
    await queryInterface.dropTable('Banners');
  }
};
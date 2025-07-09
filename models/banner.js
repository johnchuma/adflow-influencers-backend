'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.CampaignInfluencer)
    }
  }
  Banner.init({
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
       rejectionReason:{
        type:DataTypes.TEXT("long"),
        allowNull:true
      },
      status:{
        type:DataTypes.STRING,
        defaultValue:"PENDING"
      },
       description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};
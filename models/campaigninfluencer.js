"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CampaignInfluencer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CampaignInfluencer.belongsTo(models.User)
      CampaignInfluencer.belongsTo(models.Campaign)
      CampaignInfluencer.hasOne(models.Payment)
    }
  }
  CampaignInfluencer.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      campaignId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "SENT",
      },
    },
    {
      sequelize,
      modelName: "CampaignInfluencer",
    }
  );
  return CampaignInfluencer;
};

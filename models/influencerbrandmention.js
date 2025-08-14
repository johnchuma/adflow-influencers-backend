"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfluencerBrandMention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfluencerBrandMention.belongsTo(models.User);
    }
  }
  InfluencerBrandMention.init(
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
    },
    {
      sequelize,
      modelName: "InfluencerBrandMention",
    }
  );
  return InfluencerBrandMention;
};

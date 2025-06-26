"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Campaign.init(
    {
      id: {
        allowNull: false,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      includeTesting: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    },
    {
      sequelize,
      modelName: "Campaign",
    }
  );
  return Campaign;
};

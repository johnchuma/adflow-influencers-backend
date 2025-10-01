"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfluencerGroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InfluencerGroupMember.belongsTo(models.User);
      InfluencerGroupMember.belongsTo(models.InfluencersGroup);
      // define association here
    }
  }
  InfluencerGroupMember.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      influencersGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      budget: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      isSelected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "InfluencerGroupMember",
      tableName: "InfluencerGroupMembers",
    }
  );
  return InfluencerGroupMember;
};

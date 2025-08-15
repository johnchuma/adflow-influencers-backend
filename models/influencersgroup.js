"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfluencersGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfluencersGroup.hasMany(models.InfluencerGroupMember);
    }
  }
  InfluencersGroup.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      suggestedInfluencers:{
        type:DataTypes.JSON,
        allowNull:true
      },
      status:{
        type:DataTypes.STRING,
        defaultValue:"PENDING",
      },
    },
    {
      sequelize,
      modelName: "InfluencersGroup",
    }
  );
  return InfluencersGroup;
};

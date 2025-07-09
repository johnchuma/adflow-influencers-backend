'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InfluencerDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfluencerDetail.belongsTo(models.User)
    }
  }
  InfluencerDetail.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: true,
      },
      profileUrl: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
       category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagramHandle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagramLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      youtubeHandle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      youtubeLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiktokHandle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiktokLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      xHandle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      xLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tag: { type: DataTypes.STRING, allowNull: true },
      real: { type: DataTypes.DOUBLE, defaultValue: 0 },
      country: { type: DataTypes.STRING, defaultValue: "Tanzania" },
      status: { type: DataTypes.STRING, defaultValue: "lead" },
      followersX: { type: DataTypes.INTEGER, defaultValue: 0 },
      followersYoutube: { type: DataTypes.INTEGER, defaultValue: 0 },
      followersTiktok: { type: DataTypes.INTEGER, defaultValue: 0 },
      followersInstagram: { type: DataTypes.INTEGER, defaultValue: 0 },
      saturationRate: { type: DataTypes.DOUBLE, defaultValue: 0 },
      postEffectiveness: { type: DataTypes.DOUBLE, defaultValue: 0 },
      instagramPriceRange: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      tiktokPriceRange: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      xPriceRange: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      youtubePriceRange: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      instagramStats: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      tiktokStats: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      xStats: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      youtubeStats: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      audiencesByGender: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      audienceByCountry: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      audienceByCity: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      audienceByAge: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
  }, {
    sequelize,
    modelName: 'InfluencerDetail',
  });
  return InfluencerDetail;
};
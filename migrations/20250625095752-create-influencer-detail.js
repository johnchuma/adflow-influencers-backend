"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("InfluencerDetails", {
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
      profileUrl: {
        type: DataTypes.TEXT("long"),
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("InfluencerDetails");
  },
};

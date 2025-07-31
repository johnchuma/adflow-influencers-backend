"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("CampaignInfluencerReports", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      campaignInfluencerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      urls: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      instagramTotalViews: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instagramEngagementRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramTotalInteractions: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instagramWatchTime: {
        type: DataTypes.STRING, // Store as string (e.g., '21d 20h 25m 41s')
        allowNull: true,
      },
      instagramLikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instagramLikesRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramComments: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instagramCommentsRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramShares: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instagramSharesRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramSaves: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instagramSavesRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramFollowersViewsPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramNonFollowersViewsPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      instagramProfileVisits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // TikTok Analytics
      tiktokVideoViews: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokEngagementRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokCompletionRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokNewFollowers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokFollowerGrowthPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokLikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokLikesRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokComments: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokCommentsRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokShares: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokSharesRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokSaves: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tiktokSavesRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokTotalPlayTime: {
        type: DataTypes.STRING, // Store as string (e.g., '1h:9m:31s')
        allowNull: true,
      },
      tiktokAvgWatchTime: {
        type: DataTypes.STRING, // Store as string (e.g., '8.3s')
        allowNull: true,
      },
      tiktokVideoRetentionPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokFullVideoCompletionPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokNewViewersPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokReturningViewersPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokFollowersViewsPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokNonFollowersViewsPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokMalePercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tiktokFemalePercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
    await queryInterface.dropTable("CampaignInfluencerReports");
  },
};

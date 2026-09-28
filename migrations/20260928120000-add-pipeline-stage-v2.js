"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("CampaignInfluencers");
    if (!tableDescription.pipelineStage) {
      await queryInterface.addColumn("CampaignInfluencers", "pipelineStage", {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "Proposed",
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("CampaignInfluencers");
    if (tableDescription.pipelineStage) {
      await queryInterface.removeColumn("CampaignInfluencers", "pipelineStage");
    }
  },
};

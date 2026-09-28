"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("CampaignInfluencers", "pipelineStage", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "Proposed",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("CampaignInfluencers", "pipelineStage");
  },
};

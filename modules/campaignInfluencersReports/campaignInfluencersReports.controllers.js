const { Op, fn } = require("sequelize");
const { CampaignInfluencerReport } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addCampaignInfluencerReport = async (req, res) => {
  try {
    let {
     url,
     campaignInfluencerId
    } = req.body;
console.log(req.body)
    const response = CampaignInfluencerReport.create({
      url,campaignInfluencerId
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getCampaignInfluencerReports = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await CampaignInfluencerReport.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
        userId: id,
      },
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      rows: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

const getCampaignInfluencerReport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencerReport.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCampaignInfluencerReport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencerReport.findOne({
      where: {
        id,
      },
    });
    const response = await user.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteCampaignInfluencerReport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencerReport.findOne({
      where: {
        id,
      },
    });
    const response = await user.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addCampaignInfluencerReport,
  getCampaignInfluencerReports,
  deleteCampaignInfluencerReport,
  getCampaignInfluencerReport,
  updateCampaignInfluencerReport,
};

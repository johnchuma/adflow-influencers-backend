const { Op, fn } = require("sequelize");
const { CampaignInfluencer } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addCampaignInfluencer = async (req, res) => {
  try {
    let {
      title,
      description,
      budget,
      targetAudiance,
      includeTesting,
      objectives,
      deliverables,
      requirements,
    } = req.body;

    const response = CampaignInfluencer.create({
      title,
      description,
      budget,
      targetAudiance,
      includeTesting,
      objectives,
      deliverables,
      requirements,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getCampaignInfluencers = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await CampaignInfluencer.findAndCountAll({
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

const getCampaignInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencer.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCampaignInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencer.findOne({
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

const deleteCampaignInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CampaignInfluencer.findOne({
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
  addCampaignInfluencer,
  getCampaignInfluencers,
  deleteCampaignInfluencer,
  getCampaignInfluencer,
  updateCampaignInfluencer,
};

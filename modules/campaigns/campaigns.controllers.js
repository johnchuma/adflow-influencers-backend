const { Op, fn } = require("sequelize");
const { Campaign } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addCampaign = async (req, res) => {
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
    const user = req.user;
    const response = Campaign.create({
      title,
      description,
      budget,
      targetAudiance,
      includeTesting,
      objectives,
      deliverables,
      userId: user.id,
      requirements,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getCampaigns = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await Campaign.findAndCountAll({
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

const getCampaignInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Campaign.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Campaign.findOne({
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

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Campaign.findOne({
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
  addCampaign,
  getCampaigns,
  deleteCampaign,
  getCampaignInfo,
  updateCampaign,
};

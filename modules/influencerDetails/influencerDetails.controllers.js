const { Op, fn } = require("sequelize");
const { InfluencerDetail } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addInfluencerDetail = async (req, res) => {
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

    const response = InfluencerDetail.create({
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

const getInfluencerDetails = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await InfluencerDetail.findAndCountAll({
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

const getInfluencerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await InfluencerDetail.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateInfluencerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await InfluencerDetail.findOne({
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

const deleteInfluencerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await InfluencerDetail.findOne({
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
  addInfluencerDetail,
  getInfluencerDetails,
  deleteInfluencerDetail,
  getInfluencerDetail,
  updateInfluencerDetail,
};

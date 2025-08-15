const { Op } = require("sequelize");
const {
  InfluencersGroup,
  InfluencerGroupMember,
  User,
  InfluencerDetail,
  InfluencerBrandMention,
  Sequelize,
} = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findUserByid } = require("../users/users.controllers");

const addInfluencersGroup = async (req, res) => {
  try {
    let { name } = req.body;
    const response = await InfluencersGroup.create({ name });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
  }
};
const getInfluencersGroups = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await InfluencersGroup.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [["createdAt", "DESC"]],
      where: {
        name: {
          [Op.like]: `%${keyword}%`,
        },
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

const getInfluencersGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const influencerDetail = await InfluencersGroup.findOne({
      where: {
        id,
      },
      include: [
        {
          model: InfluencerGroupMember,
          include: [
            {
              model: User,
              include: [InfluencerDetail, InfluencerBrandMention],
            },
          ],
        },
      ],
    });
    successResponse(res, influencerDetail);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteInfluencersGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const influencerDetail = await InfluencersGroup.findOne({
      where: {
        id,
      },
    });
    const response = await influencerDetail.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const editInfluencersGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const influencerDetail = await InfluencersGroup.findOne({
      where: {
        id,
      },
    });
    const response = await influencerDetail.update(data);
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addInfluencersGroup,
  deleteInfluencersGroup,
  editInfluencersGroup,
  getInfluencersGroup,
  getInfluencersGroups,
};

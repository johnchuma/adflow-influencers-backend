const { Op } = require("sequelize");
const { InfluencerBrandMention, User, Sequelize } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addInfluencerBrandMention = async (req, res) => {
  try {
    let { brandLogo, brandName, mentions, effectiveness, userId } = req.body;
    const response = await InfluencerBrandMention.create({
      brandName,
      brandLogo,
      mentions,
      effectiveness,
      userId,
    });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
  }
};
const getInfluencerBrandMentions = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await InfluencerBrandMention.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [["createdAt", "DESC"]],
      where: {
        log: {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: [User],
      attributes: {
        exclude: ["id"],
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

const getInfluencerBrandMention = async (req, res) => {
  try {
    const { id } = req.params;
    const influencerDetail = await InfluencerBrandMention.findOne({
      where: {
        id,
      },
    });
    successResponse(res, influencerDetail);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteInfluencerBrandMention = async (req, res) => {
  try {
    const { id } = req.params;
    const influencerDetail = await InfluencerBrandMention.findOne({
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
const editInfluencerBrandMention = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const influencerDetail = await InfluencerBrandMention.findOne({
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
  addInfluencerBrandMention,
  deleteInfluencerBrandMention,
  editInfluencerBrandMention,
  getInfluencerBrandMention,
  getInfluencerBrandMentions,
};

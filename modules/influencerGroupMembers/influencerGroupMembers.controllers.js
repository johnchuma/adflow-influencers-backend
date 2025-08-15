const { Op } = require("sequelize");
const { InfluencerGroupMember, Sequelize } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const {
  findInfluencersGroupByid,
} = require("../influencerGroup/influencerGroup.controllers");

const addInfluencerGroupMember = async (req, res) => {
  try {
    let { group_id, user_id } = req.body;
    const response = await InfluencerGroupMember.create({
      userId: user_id,
      influencersGroupId: group_id,
    });
    console.log(response);
    successResponse(res, response);
  } catch (error) {
    console.log(error);
  }
};
const getInfluencerGroupMembers = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await InfluencerGroupMember.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [["createdAt", "DESC"]],
      where: {
        log: {
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
const getGroupMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await InfluencerGroupMember.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        influencersGroupId: id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getInfluencerGroupMember = async (req, res) => {
  try {
    const { id } = req.params;
    const influencerDetail = await InfluencerGroupMember.findOne({
      where: {
        id,
      },
    });
    successResponse(res, influencerDetail);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteInfluencerGroupMember = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const influencerDetail = await InfluencerGroupMember.findOne({
      where: {
        id,
      },
    });
    const response = await influencerDetail.destroy();
    console.log("deleated");
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const editInfluencerGroupMember = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const influencerDetail = await InfluencerGroupMember.findOne({
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
  addInfluencerGroupMember,
  deleteInfluencerGroupMember,
  editInfluencerGroupMember,
  getGroupMembers,
  getInfluencerGroupMember,
  getInfluencerGroupMembers,
};

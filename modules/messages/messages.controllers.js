const { Op, fn } = require("sequelize");
const { Message, User, InfluencerDetail } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addMessage = async (req, res) => {
  try {
    let { message, campaignInfluencerId } = req.body;
    const response = await Message.create({
      message,
      campaignInfluencerId,
      userId: req.user.id,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getMessages = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { campaignInfluencerId } = req.params;
    const response = await Message.findAndCountAll({
      order: [["createdAt"]],
      limit: req.limit,
      offset: req.offset,
      where: {
        campaignInfluencerId,
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

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Message.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getUnapprovedMessage = async (req, res) => {
  try {
    const message = await Message.findAll({
      where: {
        approved: false,
      },
      include: [
        {
          model: User,
          include: [
            {
              model: InfluencerDetail,
            },
          ],
        },
      ],
    });
    successResponse(res, message);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Message.findOne({
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

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Message.findOne({
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
  addMessage,
  getMessages,
  deleteMessage,
  getMessage,
  updateMessage,
  getUnapprovedMessage,
};

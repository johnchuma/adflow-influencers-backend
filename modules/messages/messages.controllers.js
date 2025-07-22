const { Op, fn } = require("sequelize");
const {
  Message,
  User,
  InfluencerDetail,
  CampaignInfluencer,
  Campaign,
} = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const {
  sendWhatsappAuthSMS,
  sendWhatsappMessageAlert,
} = require("../../utils/send_whatsapp_sms");
const { sendNewMessageAlert } = require("../../utils/mail_controller");

const addMessage = async (req, res) => {
  try {
    let { message, campaignInfluencerId } = req.body;
    const response = await Message.create({
      message,
      campaignInfluencerId,
      userId: req.user.id,
    });
    await sendWhatsappMessageAlert({
      phone: "0786520788",
      name: "Herman",
      link: "https://dashboard.adflow.africa/messages",
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
    console.log()
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
    const message = await Message.findOne({
      where: {
        id,
      },
      include: [
        {
          model: CampaignInfluencer,
          include: [
            {
              model: Campaign,
              include: [User],
            },
          ],
        },
      ],
    });
    if (req.body.approved) {
      // console.log(message.CampaignInfluencer.Campaign)
      await sendNewMessageAlert({
        to:
          message.CampaignInfluencer?.Campaign?.User?.email ||
          "johnvchuma@gmail.com",
        username: message.CampaignInfluencer?.Campaign?.User?.name || "John",
        subject: "New Message Alert",
      });
    }
    const response = await message.update({
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
    const message = await Message.findOne({
      where: {
        id,
      },
    });
    const response = await message.destroy();
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

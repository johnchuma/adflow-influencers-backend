const { Op, fn } = require("sequelize");
const { Notification,Campaign, User,ClientDetail } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addNotification = async (req, res) => {
  try {
    let { title, description,type,campaignId} = req.body;
    const {id} = req.user;
    const response = Notification.create({
      title,
      description,
      userId:id,
      type,
      campaignId
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getNotifications = async (req, res) => {
  try {
    const {id} = req.user;
    const response = await Notification.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where:{
        userId:id
      }
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
const getCampaignNotifications = async (req, res) => {
  try {
    const {id} = req.user;
    const response = await Notification.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where:{
        userId:id,
        type:"campaign"
      },
      include:[{
        model:Campaign,
        include:[{
          model:User,
          include:[{
            model:ClientDetail
          }]
        }]
      }]
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
const getNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOne({
      where: {
        id,
      },
    });
    successResponse(res, notification);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOne({
      where: {
        id,
      },
    });
    const response = await notification.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOne({
      where: {
        id,
      },
    });
    const response = await notification.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addNotification,
  getNotifications,
  deleteNotification,
  getNotification,
  updateNotification,
  getCampaignNotifications,
};

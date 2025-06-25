const { Op, fn } = require("sequelize");
const { Notification } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addNotification = async (req, res) => {
  try {
    let { title, description } = req.body;

    const response = Notification.create({
      title,
      description,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getNotifications = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await Notification.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      where: {
        title: {
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

const getNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Notification.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Notification.findOne({
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

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Notification.findOne({
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
  addNotification,
  getNotifications,
  deleteNotification,
  getNotification,
  updateNotification,
};

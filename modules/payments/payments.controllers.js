const { Op, fn } = require("sequelize");
const { Payment,Campaign,CampaignInfluencer } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addPayment = async (req, res) => {
  try {
    let { amount,campaignId} = req.body;
    const response = Payment.create({
    amount,campaignId
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getPayments = async (req, res) => {
  try {
    const {id} = req.user;
    const response = await Payment.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      include:[{
        model:Campaign,
        include:[{
          model:CampaignInfluencer,
          where:{
            userId:id
          },
          required:true
        }],
      
      }]
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      thisMonthEarnings:0,
      pendingEarnings:0,
      totalEarnings:0,
      rows: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      where: {
        id,
      },
    });
    successResponse(res, payment);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      where: {
        id,
      },
    });
    const response = await payment.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      where: {
        id,
      },
    });
    const response = await payment.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addPayment,
  getPayments,
  deletePayment,
  getPayment,
  updatePayment,
};

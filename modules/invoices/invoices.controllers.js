const { Op } = require("sequelize");
const { Invoice, CampaignInfluencer } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addInvoice = async (req, res) => {
  try {
    const { amount, campaignInfluencerId, isPaid } = req.body;
    const response = await Invoice.create({
      amount,
      campaignInfluencerId,
      isPaid,
    });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getInvoicesByCampaignInfluencer = async (req, res) => {
  try {
    const { campaignInfluencerId } = req.params;
    const response = await Invoice.findAndCountAll({
      where: { campaignInfluencerId },
    });
    successResponse(res, {
      count: response.count,
      rows: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findOne({ where: { id } });
    successResponse(res, invoice);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findOne({ where: { id } });
    const response = await invoice.update({ ...req.body });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findOne({ where: { id } });
    await invoice.destroy();
    successResponse(res, { message: "Invoice deleted" });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addInvoice,
  getInvoicesByCampaignInfluencer,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};

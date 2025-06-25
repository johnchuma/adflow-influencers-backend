const { Op, fn } = require("sequelize");
const { Invoice } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addInvoice = async (req, res) => {
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

    const response = Invoice.create({
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

const getInvoices = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.params;
    const response = await Invoice.findAndCountAll({
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

const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Invoice.findOne({
      where: {
        id,
      },
    });
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Invoice.findOne({
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

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Invoice.findOne({
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
  addInvoice,
  getInvoices,
  deleteInvoice,
  getInvoice,
  updateInvoice,
};

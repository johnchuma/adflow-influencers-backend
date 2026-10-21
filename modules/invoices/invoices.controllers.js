const { Op } = require("sequelize");
const { Invoice, CampaignInfluencer, Campaign, User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const { sendInvoiceNotification } = require("../../utils/mail_controller");
const {
  sendWhatsappInvoiceStatus,
  sendWhatsappInvoicePaid,
} = require("../../utils/send_whatsapp_sms");

const notifyFinanceUsers = async (amount, campaignInfluencerId) => {
  try {
    const campaignInfluencer = await CampaignInfluencer.findOne({
      where: { id: campaignInfluencerId },
      include: [{ model: Campaign }, { model: User }],
    });

    const financeUsers = await User.findAll({
      where: { role: "finance" },
    });

    if (financeUsers.length > 0 && campaignInfluencer) {
      const campaignName =
        campaignInfluencer.Campaign?.title || "Unknown Campaign";
      const influencerName =
        campaignInfluencer.User?.name || "Unknown Influencer";

      for (const financeUser of financeUsers) {
        if (financeUser.email) {
          sendInvoiceNotification({
            to: financeUser.email,
            name: financeUser.name,
            campaignName,
            influencerName,
            amount,
          }).catch((err) => console.log("Email send error:", err));
        }
      }
    }
  } catch (error) {
    console.log("Error notifying finance users:", error);
  }
};

const notifyInfluencerWhatsApp = async (campaignInfluencerId, status) => {
  try {
    const campaignInfluencer = await CampaignInfluencer.findOne({
      where: { id: campaignInfluencerId },
      include: [{ model: User }],
    });

    if (!campaignInfluencer || !campaignInfluencer.User?.phone) return;

    const phone = campaignInfluencer.User.phone;
    const name = campaignInfluencer.User.name;

    if (status === "paid") {
      const invoice = await Invoice.findOne({
        where: { campaignInfluencerId },
        order: [["createdAt", "DESC"]],
      });
      await sendWhatsappInvoicePaid({
        phone,
        name,
        invoiceNumber: invoice?.id?.slice(0, 8) || "N/A",
      });
    } else {
      await sendWhatsappInvoiceStatus({
        phone,
        name,
        status: status,
      });
    }
  } catch (error) {
    console.log("Error sending WhatsApp to influencer:", error);
  }
};

const addInvoice = async (req, res) => {
  try {
    const { amount, campaignInfluencerId, isPaid } = req.body;
    const response = await Invoice.create({
      amount,
      campaignInfluencerId,
      isPaid,
    });

    notifyFinanceUsers(amount, campaignInfluencerId);
    notifyInfluencerWhatsApp(campaignInfluencerId, "created");

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

    if (req.body.isPaid === true) {
      notifyInfluencerWhatsApp(invoice.campaignInfluencerId, "paid");
    } else if (req.body.status) {
      notifyInfluencerWhatsApp(invoice.campaignInfluencerId, req.body.status);
    }

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const markInvoiceProcessed = async (req, res) => {
  try {
    const { campaignInfluencerId } = req.params;
    await Invoice.update(
      { isPaid: false },
      { where: { campaignInfluencerId } }
    );
    notifyInfluencerWhatsApp(campaignInfluencerId, "processed");
    successResponse(res, { message: "Invoice processed" });
  } catch (error) {
    errorResponse(res, error);
  }
};

const markInvoicePaid = async (req, res) => {
  try {
    const { campaignInfluencerId } = req.params;
    await Invoice.update(
      { isPaid: true },
      { where: { campaignInfluencerId } }
    );
    notifyInfluencerWhatsApp(campaignInfluencerId, "paid");
    successResponse(res, { message: "Invoice paid" });
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
  markInvoiceProcessed,
  markInvoicePaid,
  deleteInvoice,
};

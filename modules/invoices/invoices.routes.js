const { Router } = require("express");
const {
  addInvoice,
  getInvoicesByCampaignInfluencer,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  markInvoiceProcessed,
  markInvoicePaid,
} = require("./invoices.controllers");

const router = Router();

router.post("/", addInvoice);
router.get(
  "/campaign-influencer/:campaignInfluencerId",
  getInvoicesByCampaignInfluencer
);
router.get("/:id", getInvoice);
router.patch("/:id", updateInvoice);
router.patch("/process/:campaignInfluencerId", markInvoiceProcessed);
router.patch("/paid/:campaignInfluencerId", markInvoicePaid);
router.delete("/:id", deleteInvoice);

module.exports = router;

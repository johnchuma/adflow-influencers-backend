const { Router } = require("express");
const {
  addInvoice,
  getInvoicesByCampaignInfluencer,
  updateInvoice,
  deleteInvoice,
  getInvoice,
} = require("./invoices.controllers");

const router = Router();

router.post("/", addInvoice);
router.get(
  "/campaign-influencer/:campaignInfluencerId",
  getInvoicesByCampaignInfluencer
);
router.get("/:id", getInvoice);
router.patch("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

module.exports = router;

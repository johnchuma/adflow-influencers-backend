const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addCampaignInfluencerReport,
  getCampaignInfluencerReports,
  updateCampaignInfluencerReport,
  deleteCampaignInfluencerReport,
  getCampaignInfluencerReport,
  getAllCampaignInfluencerReports,
  getInfluencerReportsByCampaign,
  getInfluencerReportsByCampaignInfluencer,
} = require("./campaignInfluencersReports.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addCampaignInfluencerReport);
router.get(
  "/user/:id",
  validateJWT,
  getPagination,
  getCampaignInfluencerReports
);
router.get("/campaign/:id", getPagination, getInfluencerReportsByCampaign);
router.get(
  "/campaign-influencer/:id",
  getPagination,
  getInfluencerReportsByCampaignInfluencer
);
router.get("/", getAllCampaignInfluencerReports);
router.get("/:id", getCampaignInfluencerReport);
router.patch("/:id", updateCampaignInfluencerReport);
router.delete("/:id", validateJWT, deleteCampaignInfluencerReport);

module.exports = router;

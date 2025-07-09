const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addCampaignInfluencerReport,
  getCampaignInfluencerReports,
  updateCampaignInfluencerReport,
  deleteCampaignInfluencerReport,
  getCampaignInfluencerReport,
} = require("./campaignInfluencersReports.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addCampaignInfluencerReport);
router.get("/user/:id", validateJWT, getPagination, getCampaignInfluencerReports);
router.get("/:id", validateJWT, getCampaignInfluencerReport);
router.patch("/:id", validateJWT, updateCampaignInfluencerReport);
router.delete("/:id", validateJWT, deleteCampaignInfluencerReport);

module.exports = router;

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
router.get("/:uuid", validateJWT, getCampaignInfluencerReport);
router.patch("/:uuid", validateJWT, updateCampaignInfluencerReport);
router.delete("/:uuid", validateJWT, deleteCampaignInfluencerReport);

module.exports = router;

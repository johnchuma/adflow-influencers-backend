const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addCampaignInfluencer,
  getCampaignInfluencers,
  updateCampaignInfluencer,
  deleteCampaignInfluencer,
  getCampaignInfluencer,
  getInfluencerPendingApplications,
  getInfluencerApprovedApplications,
  getInfluencerRejectedApplications,
  getCampaignInfluencerByUserAndCampaign,
} = require("./campaignInfluencers.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", addCampaignInfluencer);
router.get("/user/:id", getPagination, getCampaignInfluencers);
router.get(
  "/user/:userId/campaign/:campaignId",
  getCampaignInfluencerByUserAndCampaign
);
router.get(
  "/pending",
  validateJWT,
  getPagination,
  getInfluencerPendingApplications
);
router.get(
  "/approved",
  validateJWT,
  getPagination,
  getInfluencerApprovedApplications
);
router.get(
  "/rejected",
  validateJWT,
  getPagination,
  getInfluencerRejectedApplications
);
router.get("/:id", validateJWT, getCampaignInfluencer);
router.patch("/:id", updateCampaignInfluencer);
router.delete("/:id", validateJWT, deleteCampaignInfluencer);

module.exports = router;

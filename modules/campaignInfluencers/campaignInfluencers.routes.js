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
} = require("./campaignInfluencers.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addCampaignInfluencer);
router.get("/user/:id", getPagination, getCampaignInfluencers);
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

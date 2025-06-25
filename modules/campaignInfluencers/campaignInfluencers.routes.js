const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addCampaignInfluencer,
  getCampaignInfluencers,
  updateCampaignInfluencer,
  deleteCampaignInfluencer,
  getCampaignInfluencer,
} = require("./campaignInfluencers.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addCampaignInfluencer);
router.get("/user/:id", validateJWT, getPagination, getCampaignInfluencers);
router.get("/:uuid", validateJWT, getCampaignInfluencer);
router.patch("/:uuid", validateJWT, updateCampaignInfluencer);
router.delete("/:uuid", validateJWT, deleteCampaignInfluencer);

module.exports = router;

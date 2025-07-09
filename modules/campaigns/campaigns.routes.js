const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addCampaign,
  getCampaigns,
  getCampaignInfo,
  updateCampaign,
  deleteCampaign,
  getClientCampaigns,
  getInfluencerNewCampaigns,
  getInfluencerActiveCampaigns,
  getInfluencerCompletedCampaigns,
} = require("./campaigns.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addCampaign);
router.get("/user/:id", validateJWT, getPagination, getClientCampaigns);
router.get("/", validateJWT, getPagination, getClientCampaigns);
router.get("/new", validateJWT, getPagination, getInfluencerNewCampaigns);
router.get("/active", validateJWT, getPagination, getInfluencerActiveCampaigns);
router.get("/completed", validateJWT, getPagination, getInfluencerCompletedCampaigns);
router.get("/:id", validateJWT, getCampaignInfo);
router.patch("/:id", validateJWT, updateCampaign);
router.delete("/:id", validateJWT, deleteCampaign);

module.exports = router;

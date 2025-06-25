const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addCampaign,
  getCampaigns,
  getCampaignInfo,
  updateCampaign,
  deleteCampaign,
} = require("./campaigns.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addCampaign);
router.get("/user/:id", validateJWT, getPagination, getCampaigns);
router.get("/:uuid", validateJWT, getCampaignInfo);
router.patch("/:uuid", validateJWT, updateCampaign);
router.delete("/:uuid", validateJWT, deleteCampaign);

module.exports = router;

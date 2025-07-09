const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addInfluencerDetail,
  getInfluencerDetails,
  updateInfluencerDetail,
  deleteInfluencerDetail,
  getInfluencerDetail,
} = require("./influencerDetails.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addInfluencerDetail);
router.get("/user/:id", validateJWT, getPagination, getInfluencerDetails);
router.get("/:id", validateJWT, getInfluencerDetail);
router.patch("/:id",  updateInfluencerDetail);
router.delete("/:id", validateJWT, deleteInfluencerDetail);

module.exports = router;

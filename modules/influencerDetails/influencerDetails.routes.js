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
router.get("/:uuid", validateJWT, getInfluencerDetail);
router.patch("/:uuid", validateJWT, updateInfluencerDetail);
router.delete("/:uuid", validateJWT, deleteInfluencerDetail);

module.exports = router;

const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const { getPagination } = require("../../utils/getPagination");
const {
  addInfluencersGroup,
  getInfluencersGroups,
  getInfluencersGroup,
  editInfluencersGroup,
  deleteInfluencersGroup,
} = require("./influencerGroup.controllers");

const router = Router();

router.post("/", addInfluencersGroup);
router.get("/", getPagination, getInfluencersGroups);
router.get("/:id", getInfluencersGroup);
router.patch("/:id", editInfluencersGroup);
router.delete("/:id", deleteInfluencersGroup);

module.exports = router;

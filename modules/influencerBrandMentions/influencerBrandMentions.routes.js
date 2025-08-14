const { Router } = require("express");
const { getPagination } = require("../../utils/getPagination");
const {
  addInfluencerBrandMention,
  getInfluencerBrandMentions,
  getInfluencerBrandMention,
  editInfluencerBrandMention,
  deleteInfluencerBrandMention,
} = require("./influencerBrandMentions.controllers");

const router = Router();

router.post("/", addInfluencerBrandMention);
router.get("/", getPagination, getInfluencerBrandMentions);
router.get("/:id", getInfluencerBrandMention);
router.patch("/:id", editInfluencerBrandMention);
router.delete("/:id", deleteInfluencerBrandMention);

module.exports = router;

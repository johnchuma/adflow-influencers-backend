const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const { getPagination } = require("../../utils/getPagination");
const {
  addInfluencerBrandMention,
  getInfluencerBrandMentions,
  getInfluencerBrandMention,
  editInfluencerBrandMention,
  deleteInfluencerBrandMention,
} = require("./influencerBrandMentions.controllers");

const router = Router();

router.post("/", validateJWT, addInfluencerBrandMention);
router.get("/", validateJWT, getPagination, getInfluencerBrandMentions);
router.get("/:id", validateJWT, getInfluencerBrandMention);
router.patch("/:id", validateJWT, editInfluencerBrandMention);
router.delete("/:id", validateJWT, deleteInfluencerBrandMention);

module.exports = router;

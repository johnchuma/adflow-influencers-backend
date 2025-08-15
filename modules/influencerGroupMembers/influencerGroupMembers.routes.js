const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const { getPagination } = require("../../utils/getPagination");
const {
  addInfluencerGroupMember,
  getInfluencerGroupMembers,
  getInfluencerGroupMember,
  editInfluencerGroupMember,
  deleteInfluencerGroupMember,
  getGroupMembers,
} = require("./influencerGroupMembers.controllers");

const router = Router();

router.post("/", addInfluencerGroupMember);
router.get("/", getPagination, getInfluencerGroupMembers);
router.get("/group/:id", getPagination, getGroupMembers);
router.get("/:id", getInfluencerGroupMember);
router.patch("/:id", editInfluencerGroupMember);
router.delete("/:id", deleteInfluencerGroupMember);

module.exports = router;

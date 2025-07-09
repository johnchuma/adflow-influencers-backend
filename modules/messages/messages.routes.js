const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  getMessage,
  getUnapprovedMessage,
} = require("./messages.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addMessage);
router.get("/unapproved", getUnapprovedMessage);
router.get("/:campaignInfluencerId", validateJWT, getPagination, getMessages);
router.get("/:id", getMessage);
router.patch("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
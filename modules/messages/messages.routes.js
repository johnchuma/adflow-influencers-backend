const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  getMessage,
} = require("./messages.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addMessage);
router.get("/:campaignInfluencerId", validateJWT, getPagination, getMessages);
router.get("/:id", validateJWT, getMessage);
router.patch("/:id", validateJWT, updateMessage);
router.delete("/:id", validateJWT, deleteMessage);

module.exports = router;

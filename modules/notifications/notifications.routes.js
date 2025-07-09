const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  getNotification,
  getCampaignNotifications,
} = require("./notifications.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", validateJWT, addNotification);
router.get("/", validateJWT, getPagination, getNotifications);
router.get("/campaign", validateJWT, getPagination, getCampaignNotifications);
router.get("/:id", validateJWT, getNotification);
router.patch("/:id", validateJWT, updateNotification);
router.delete("/:id", validateJWT, deleteNotification);

module.exports = router;

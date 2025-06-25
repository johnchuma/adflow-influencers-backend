const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  getNotification,
} = require("./notifications.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", validateJWT, addNotification);
router.get("/", validateJWT, getPagination, getNotifications);
router.get("/:uuid", validateJWT, getNotification);
router.patch("/:uuid", validateJWT, updateNotification);
router.delete("/:uuid", validateJWT, deleteNotification);

module.exports = router;

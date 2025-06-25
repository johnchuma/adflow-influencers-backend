const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  getNotification,
} = require("./messages.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addNotification);
router.get("/user/:id", validateJWT, getPagination, getNotifications);
router.get("/:uuid", validateJWT, getNotification);
router.patch("/:uuid", validateJWT, updateNotification);
router.delete("/:uuid", validateJWT, deleteNotification);

module.exports = router;

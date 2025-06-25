const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addUser,
  getUserInfo,
  updateUser,
  deleteUser,
  confirmCode,
  sendCode,
  getInfluencers,
} = require("./users.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", addUser);
router.post("/auth/confirm-code", confirmCode);
router.post("/auth/send-code", sendCode);
router.get("/", getPagination, getInfluencers);
router.get("/:uuid", validateJWT, getUserInfo);
router.patch("/:uuid", validateJWT, updateUser);
router.delete("/:uuid", validateJWT, deleteUser);

module.exports = router;

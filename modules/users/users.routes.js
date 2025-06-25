const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addUser,
  updateUser,
  deleteUser,
  confirmCode,
  sendCode,
  getInfluencers,
  getMyInfo,
} = require("./users.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", addUser);
router.post("/auth/confirm-code", confirmCode);
router.post("/auth/send-code", sendCode);
router.get("/", getPagination, getInfluencers);
router.get("/me", validateJWT, getMyInfo);
router.patch("/:uuid", validateJWT, updateUser);
router.delete("/:uuid", validateJWT, deleteUser);

module.exports = router;

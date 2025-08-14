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
  getUser,
} = require("./users.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", addUser);
router.post("/auth/confirm-code", confirmCode);
router.post("/auth/send-code", sendCode);
router.get("/influencers", getPagination, getInfluencers);
router.get("/me", validateJWT, getMyInfo);
router.get("/:id",  getUser);
router.patch("/:id",  updateUser);
router.delete("/:id",  deleteUser);

module.exports = router;

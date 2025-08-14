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
<<<<<<< HEAD
  getUser,
=======
>>>>>>> 6a14771ad35720f413912ec4705c276a18916c1e
} = require("./users.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", addUser);
router.post("/auth/confirm-code", confirmCode);
router.post("/auth/send-code", sendCode);
router.get("/influencers", getPagination, getInfluencers);
router.get("/me", validateJWT, getMyInfo);
<<<<<<< HEAD
router.get("/:id",  getUser);
router.patch("/:id",  updateUser);
router.delete("/:id",  deleteUser);
=======
router.patch("/:id", validateJWT, updateUser);
router.delete("/:id", deleteUser);
>>>>>>> 6a14771ad35720f413912ec4705c276a18916c1e

module.exports = router;

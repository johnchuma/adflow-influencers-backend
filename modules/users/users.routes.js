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
  getUsers,
  getUser,
  getPublishers,
  getAdvertisers,
  getCampaignInfluencers,
} = require("./users.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", addUser);
router.post("/auth/confirm-code", confirmCode);
router.post("/auth/send-code", sendCode);

// Specific user type routes
router.get("/influencers/campaign/*", validateJWT, getPagination, getCampaignInfluencers);
router.get("/influencers", getPagination, getInfluencers);
router.get("/publishers/*", validateJWT, getPagination, getPublishers);
router.get("/advertisers/*", validateJWT, getPagination, getAdvertisers);

// User management routes
router.get("/me", validateJWT, getMyInfo);
router.get("/:uuid", validateJWT, getUser);
router.patch("/:uuid", validateJWT, updateUser);
router.delete("/:uuid", deleteUser);

module.exports = router;

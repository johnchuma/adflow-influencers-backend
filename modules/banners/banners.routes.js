const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  getBanner,
} = require("./banners.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addBanner);
router.get("/", validateJWT, getPagination, getBanners);
router.get("/:id", validateJWT, getBanner);
router.patch("/:id", validateJWT, updateBanner);
router.delete("/:id", validateJWT, deleteBanner);

module.exports = router;

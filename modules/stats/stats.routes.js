

const {Router} = require("express");
const { clientOverviewStats, influencerOverviewStats } = require("./stats.controllers");
const { validateJWT } = require("../../utils/validateJWT");

const router = Router();
router.get("/client-overview",validateJWT, clientOverviewStats)
router.get("/influencer-overview",validateJWT, influencerOverviewStats)

module.exports = router
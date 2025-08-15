const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addPayment,
  getPayments,
  updatePayment,
  deletePayment,
  getPayment,
} = require("./payments.controllers");
const { getPagination } = require("../../utils/getPagination");
const router = Router();

router.post("/", addPayment);
router.get("/", validateJWT, getPagination, getPayments);
router.get("/:id", validateJWT, getPayment);
router.patch("/:id", validateJWT, updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;

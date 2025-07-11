const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoice,
} = require("./invoices.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", validateJWT, addInvoice);
router.get("/user/:id", validateJWT, getPagination, getInvoices);
router.get("/:id", validateJWT, getInvoice);
router.patch("/:id", validateJWT, updateInvoice);
router.delete("/:id", validateJWT, deleteInvoice);

module.exports = router;

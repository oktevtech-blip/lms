const express = require("express");
const router = express.Router();

const {
  getPayments,
  recordPayment,
} = require("../controllers/paymentController");

router.get("/", getPayments);
router.post("/", recordPayment);

module.exports = router;
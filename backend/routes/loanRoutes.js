const express = require("express");
const router = express.Router();

const {
  getLoans,
  getLoan,
  createLoan,
  updateLoanStatus,
  deleteLoan,
} = require("../controllers/loanController");

router.get("/", getLoans);

router.get("/:id", getLoan);

router.post("/", createLoan);

router.put("/:id/status", updateLoanStatus);

router.delete("/:id", deleteLoan);

module.exports = router;
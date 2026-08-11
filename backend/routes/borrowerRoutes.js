// const express = require("express");
// const router = express.Router();

// const {
//   getBorrowers,
//   getBorrower,
//   createBorrower,
//   updateBorrower,
//   deleteBorrower,
// } = require("../controllers/borrowerController");

// router.get("/", getBorrowers);
// router.get("/:id", getBorrower);
// router.post("/", createBorrower);
// router.put("/:id", updateBorrower);
// router.delete("/:id", deleteBorrower);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  getBorrowers,
  getBorrower,
  createBorrower,
  updateBorrower,
  deleteBorrower,
} = require("../controllers/borrowerController");

// Get all borrowers
router.get("/", getBorrowers);

// Get one borrower
router.get("/:id", getBorrower);

// Create borrower
router.post("/", createBorrower);

// Update borrower
router.put("/:id", updateBorrower);

// Delete borrower
router.delete("/:id", deleteBorrower);

module.exports = router;
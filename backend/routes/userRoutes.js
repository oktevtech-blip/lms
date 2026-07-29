const express = require("express");
const router = express.Router();

const {
  login,
  getUsers,
  createUser,
  getProfile,
  updateProfile,
  deleteUser,
} = require("../controllers/userController");

// Authentication
router.post("/login", login);

// User Management
router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);

// Logged-in User Profile
router.get("/profile/:user_id", getProfile);
router.put("/profile/:user_id", updateProfile);

module.exports = router;
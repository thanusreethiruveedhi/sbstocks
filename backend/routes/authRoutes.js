const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/authController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get All Users
router.get("/users", getUsers);

module.exports = router;
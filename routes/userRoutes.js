const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get all user profiles (protected route)
router.get("/all", userController.getAllUserProfiles);

// Get a single user profile (protected route)
router.get("/profile", authMiddleware, userController.getUserProfile);

// Update user profile (protected route)
router.put("/profile", authMiddleware, userController.updateUserProfile);

// Delete user account (protected route)
router.delete("/delete", authMiddleware, userController.deleteUserAccount);

module.exports = router;

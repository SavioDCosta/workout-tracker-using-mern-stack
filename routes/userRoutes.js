const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get user profile (protected route)
router.get("/profile", authMiddleware, userController.getUserProfile);

// Update user profile (protected route)
router.put("/profile", authMiddleware, userController.updateUserProfile);

// Delete user account (protected route)
router.delete("/delete", authMiddleware, userController.deleteUserAccount);

module.exports = router;

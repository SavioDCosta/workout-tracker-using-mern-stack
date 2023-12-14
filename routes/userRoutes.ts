import express, { Router } from "express";
import userController from "../controllers/userController";
import authCheckMiddleware from "../middleware/authCheckMiddleware";

const router: Router = express.Router();

// Register a new user
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get all user profiles (protected route)
router.get("/all", userController.getAllUserProfiles);

// Get a single user profile (protected route)
router.get("/profile", authCheckMiddleware, userController.getUserProfile);

// Update user profile (protected route)
router.put("/profile", authCheckMiddleware, userController.updateUserProfile);

// Delete user account (protected route)
router.delete("/delete", authCheckMiddleware, userController.deleteUserAccount);

export default router;

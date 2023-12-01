import userModel from "../models/userModel"; // Adjust path as needed
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Request, Response } from "express";

// JWT Token Generator
const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

const userController = {
  // Register a new user
  registerUser: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // Validation
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields must be filled" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({ message: "Password is weak" });
      }

      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Password hashing
      const hashedPassword = await bcrypt.hash(password, 8);
      // Create a new user
      const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      // Save the new user
      await newUser.save();
      const token = createToken(newUser._id);
      return res.status(200).json({ newUser, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // User login
  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // Validation
      if (!email || !password) {
        return res.status(400).json({ message: "All fields must be filled" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({ message: "Password is weak" });
      }
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "This account doesn't exist" });
      }
      const comparePasswords = await bcrypt.compare(password, user.password);
      if (!comparePasswords) {
        return res
          .status(400)
          .json({ message: "Incorrect email or password " });
      }
      const token = createToken(user._id);
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all user profiles
  getAllUserProfiles: async (req: Request, res: Response) => {
    try {
      const users = await userModel
        .find({})
        .populate("workout_plans.workoutPlanId")
        .populate("current_workout_plan")
        .sort({ createdAt: -1 });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get a single user profile
  getUserProfile: async (req: Request, res: Response) => {
    try {
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update user profile
  updateUserProfile: async (req: Request, res: Response) => {
    try {
      // Implement update profile logic
      // Check user exists, validate new data, update in DB, etc.
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete user account
  deleteUserAccount: async (req: Request, res: Response) => {
    try {
      // Implement delete account logic
      // Check user exists, delete user from DB, etc.
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
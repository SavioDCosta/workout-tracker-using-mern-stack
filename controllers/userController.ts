import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";

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
        return res.status(400).json({ error: "All fields must be filled" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
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
        return res.status(400).json({ error: "Password is weak" });
      }

      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      // Password hashing
      const hashedPassword = await bcrypt.hash(password, 8);
      // Create a new user
      const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        admin: false,
      });
      // Save the new user
      await newUser.save();
      const token = createToken(newUser._id);
      return res.status(200).json({ newUser, token });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // User login
  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // Validation
      if (!email || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
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
        return res.status(400).json({ error: "Password is weak" });
      }
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "This account doesn't exist" });
      }
      const comparePasswords = await bcrypt.compare(password, user.password);
      if (!comparePasswords) {
        return res.status(400).json({ error: "Incorrect email or password " });
      }
      const token = createToken(user._id);
      return res.status(200).json({ user, token });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Get all user profiles
  getAllUserProfiles: async (req: Request, res: Response) => {
    try {
      const users = await userModel
        .find({})
        .populate("workout_plans.workoutPlan")
        .populate("current_workout_plan")
        .sort({ createdAt: -1 });
      return res.status(200).json(users);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Get a single user profile
  getUserProfile: async (req: Request, res: Response) => {
    try {
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Update user profile
  updateUserProfile: async (req: Request, res: Response) => {
    try {
      // Implement update profile logic
      // Check user exists, validate new data, update in DB, etc.
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Delete user account
  deleteUserAccount: async (req: Request, res: Response) => {
    try {
      // Implement delete account logic
      // Check user exists, delete user from DB, etc.
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },
};

export default userController;

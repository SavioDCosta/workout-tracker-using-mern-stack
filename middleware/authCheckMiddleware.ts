import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

const authCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "Authorization token required" });
  } else {
    const token = authorization.replace("Bearer ", "");
    try {
      const _id = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
      await userModel.findOne({ _id }).select("_id");
      next();
    } catch (error) {
      res.status(401).send({ error: "Request is not authorized" });
    }
  }
};

export default authCheckMiddleware;

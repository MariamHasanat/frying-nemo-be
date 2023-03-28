import express from "express";
import { UserNS } from "../types/index";

export const validateUser = (
  req: UserNS.IUserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email And Password are required!");
  }
  next();
};

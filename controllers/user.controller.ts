import mongoose from "mongoose";
import { User } from "../models/index";
import { UserNS } from "../types/index";

const createUser = (req: UserNS.IUserRequest) => {
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    imageUrl: req.body.imageUrl
  });

  return newUser.save().then(() => {
    return true; // created successfully
  });
};

export default {
   createUser
};

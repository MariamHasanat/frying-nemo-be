import mongoose from "mongoose";
import { User } from "../types/user";

const userSchema = new mongoose.Schema<User.IUser>({
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
  fullName: { type: String },
  imageUrl: { type: String },
  authToken: { type: String },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

export default User;
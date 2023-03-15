import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: Number,
  email: { type: String },
  password: { type: String },
  role: { type: String },
  fullName: { type: String },
  imageUrl: { type: String },
  authToken: { type: String },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

export default User;
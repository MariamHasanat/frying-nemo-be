import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  fullName: {
    type: String,
    required: true
  },
  imageUrl: String,
  authToken: String,
  items: {
    type: [mongoose.Schema.Types.ObjectId]
  }
});

const User = mongoose.model("User", UserModel);

export default User;
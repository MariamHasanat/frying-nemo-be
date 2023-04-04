
import User from "../models/user.model";
import { UserNS } from "../types/index";


const createUser = (req:UserNS.IUserRequest) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    role: req.body.role,
    authToken: req.body.authToken,
    imagUrl: req.body.imageUrl
  });


  return newUser.save()
    .then(() => {
      return true;
    });
}
const login = async (req: UserNS.LoginRequest) => {
  return await User.findOne({
    email: req.body.email,
    password: req.body.password
  }).select(['email', 'fullName', 'imageUrl', 'role']);
}
export default {
  createUser,
  login
}

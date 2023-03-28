import User from "../models/user.js";
import { UserNS } from "../type/index.js";

const createUser = (req: UserNS.UserRequest) => {
  const newUser = new User(req.body);

  return newUser.save()
    .then(() => {
      return true;
    });
}

export default {
  createUser
}
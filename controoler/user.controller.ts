import User from "../models/user.model.js";
import { UserNS } from "../types/index.js";

const creatUser =(req : UserNS.UserRequest)=>{



    const newUser  = new User(req.body);
    return newUser.save()
    .then(()=>{
        return true;
    })
}
const login = async(req: UserNS.LoginRequest) => {
    return await User.findOne({
      email: req.body.email,
      password: req.body.password
    }).select(['email', 'fullName', 'imageUrl', 'role']);
  }

export default {
    creatUser,
    login
}
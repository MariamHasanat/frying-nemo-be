import User from "../models/user";
import { UserNS } from "../types/index";

const createUser = (user: UserNS.IUser) => {
    const newUser = new User({
        ...user
    })
    return newUser.save();
}

const login = async (req: UserNS.IUserRequest) => {
    return await User.findOne({
        email: req.body.email,
        password: req.body.password
    }).select(['fullName', 'email', 'imageUrl', 'role']);
}

export { createUser, login }
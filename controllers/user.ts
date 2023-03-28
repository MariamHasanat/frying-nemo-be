import User from "../models/user";
import { UserNS } from "../types/index";

const createUser = (user: UserNS.IUser) => {
    const newUser = new User({
        ...user
    })
    return newUser.save();
}

export { createUser }
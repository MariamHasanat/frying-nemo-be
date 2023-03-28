import { User } from "../models/index";
import { User as UserNs } from "../types/index";

const createUser = (body: UserNs.IUser) => {
    const newUser = new User(body);
    return newUser.save()
        .then(() => { return true })
        .catch((err) => console.log(err));
}

export default {
    createUser,
}
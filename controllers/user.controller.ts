import { User } from "../models/index";
import { User as UserNs } from "../types/index";

const createUser = (body: UserNs.IUser) => {
    const newUser = new User(body);
    return newUser.save()
        .then(() => { return true })
        .catch((err) => console.log(err));
}

const userLogin = async (loginReq: UserNs.ILoginRequest) => {
    const user = await User.findOne({
        email: loginReq.body.email,
        password: loginReq.body.password
    }).select(['email', 'fullName', 'imageURL', 'role']);
    return user;
}


export default {
    createUser,
    userLogin
}
import User from "../models/user.js";
const createUser = (req) => {
    const newUser = new User(req.body);
    return newUser.save()
        .then(() => {
        return true;
    });
};
export default {
    createUser
};

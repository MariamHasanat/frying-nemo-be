import User from "../models/user.model.js";
import { UserNS } from "../types/index.js";

const creatUser =(req : UserNS.UserRequest)=>{



    const newUser  = new User(req.body);
    return newUser.save()
    .then(()=>{
        return true;
    })
}

export default {
    creatUser
}
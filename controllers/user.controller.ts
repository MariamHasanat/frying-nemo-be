import User from "../models/User";
import { UsersInfo } from "../types/index";

const CreateUser =(req:UsersInfo.UserRequest)=>{
    const user = new User(req)
    return user.save()

    
}

export default  {
    CreateUser
}
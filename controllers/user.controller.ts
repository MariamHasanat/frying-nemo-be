import User from '../models/item.model';


const createUser = (req: any) => {

    const newUser = new User({
        
    });
    return newUser.save();
};




export default {
    createUser
};
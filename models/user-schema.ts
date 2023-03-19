import mongoose from "mongoose";
import IUser from "./../interfaces/user-interface";
const UserSchema = new mongoose.Schema<IUser>(
    {
        id: Number,
        email: { type: String },
        password: { type: String },
        role: { type: String },
        fullName: { type: String },
        imageUrl: { type: String },
        authToken: {type: String}
    }, {versionKey : false});

// create the model using this schema
const Item = mongoose.model("Item", UserSchema);
//will create the table in db ,  and return some functions to deal with table 


export default Item;

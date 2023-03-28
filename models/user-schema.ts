import mongoose from "mongoose";
import IUser from "./../interfaces/user-interface";
const UserSchema = new mongoose.Schema<IUser>(
    {

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        },
        fullName: {
            type: String,
            required: true
        },
        imageUrl: { type: String },
        authToken: { type: String }
    }, { versionKey: false });

// create the model using this schema
const User = mongoose.model("User", UserSchema);
//will create the table in db ,  and return some functions to deal with table 


export default UserSchema ;

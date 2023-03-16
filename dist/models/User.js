import mongoose, { SchemaTypes } from "mongoose";
const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: "String",
        unique: true
    },
    password: {
        required: true,
        type: "String"
    },
    role: {
        type: [],
        default: ["User"]
    },
    fullName: SchemaTypes.String,
    imageUrl: SchemaTypes.String,
    authToken: SchemaTypes.String
});
const User = mongoose.model('User', UserSchema);
export default User;

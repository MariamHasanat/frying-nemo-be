import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
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
        default: 'USER'
    },
    email: String,
    imageUrl: String,
    authToken: String,
    items: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

const User = mongoose.model('User', userSchema);

export default User;
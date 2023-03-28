import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    imageUrl: String ,
    authToken : String ,
    role : {
        type : String ,
        default : 'user'
    }
})

// this line initialze the collection in the database if it's not exists 
//it also returns an object for this table which helps to deal with this collection in the code
const User = mongoose.model('Users', mongooseSchema);  
export default User;

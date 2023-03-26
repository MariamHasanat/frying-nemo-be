import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: String,
    description: String,
    price: {
        type: Number
    },
    ingredients: {
        type: [String],
        default: []
    },
    category: String
})

// this line initialze the collection in the database if it's not exists 
//it also returns an object for this table which helps to deal with this collection in the code
const Item = mongoose.model('Items', mongooseSchema);  
export default Item;
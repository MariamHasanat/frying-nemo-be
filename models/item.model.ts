import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: String,
    description: String,
    price: {
        type: 'Number'
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        default: [],
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
    },
    imageUrl: {
        type: 'String'
    },
    description: {
        type: String
    },
    price: Number,
    category: {
        type: String
    },
    ingredients: {
        type: [String]
    },
}, { versionKey: false });

const Item = mongoose.model('item', itemSchema);

export default Item;
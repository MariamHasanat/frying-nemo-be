import mongoose, { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    // addedBy: Schema.Types.ObjectId
});

const item = mongoose.model('item', ItemSchema);

export default item;
import mongoose, { Schema } from "mongoose";

const ItemModel = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    imageUrl: String,
    description: String,
    price: {
        type: "Number",
    },
    category: {
        required: true,
        type: String
    },
    ingredients: {
        type: [String],
        default:[]
    },

    // addedBy: Schema.Types.ObjectId
});

const Item = mongoose.model("Item", ItemModel);
export default Item;
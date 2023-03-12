import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imageURL: {
        type: String,
        validate: (url: String) => url.startsWith("https://")
    },
    description: String,
    price: Number,
    category: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    addedBy: Schema.Types.ObjectId
})


const Item = model(`Item`, itemSchema);

export default Item;
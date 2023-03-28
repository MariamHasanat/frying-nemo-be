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
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: `User`
    }
})


const Item = model(`Item`, itemSchema);

export default Item;
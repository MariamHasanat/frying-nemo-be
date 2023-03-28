import mongoose from "mongoose";
import { MenuItem } from "../types/item";

const itemSchema = new mongoose.Schema<MenuItem.IItem>({
    id: Number,
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    price: Number,
    category: {
        type: [String],
    },
    ingredients: {
        type: [String]
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, { versionKey: false });

const Item = mongoose.model('item', itemSchema);

export default Item;
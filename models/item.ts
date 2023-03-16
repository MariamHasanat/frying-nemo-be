import mongoose from "mongoose";
import { IItem, IItemRequest } from "../types/item";

const itemSchema = new mongoose.Schema<IItem>({
    id: Number,
    name: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    price: Number,
    category: {
        type: String,
    },
    ingredients: {
        type: [String]
    },
}, { versionKey: false });

const Item = mongoose.model('item', itemSchema);

export default Item;
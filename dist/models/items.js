import mongoose, { Schema } from "mongoose";
const ItemsSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
        unique: true
    },
    imageUrl: String,
    description: String,
    price: Number,
    category: {
        type: "String",
        required: true
    },
    ingredients: [String],
    addedBy: Schema.Types.ObjectId
});
const Item = mongoose.model('ItemsSchema', ItemsSchema);
export default Item;

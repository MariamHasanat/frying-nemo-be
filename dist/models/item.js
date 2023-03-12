import mongoose from "mongoose";
const mongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    description: String,
    price: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    category: [String]
});
const Item = mongoose.model('Items', mongooseSchema);
export default Item;

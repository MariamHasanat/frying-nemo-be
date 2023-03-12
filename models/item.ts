import mongoose, { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: String,
    description: String,
    price:{
        type: 'Number',
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: [String],
    addedBy: Schema.Types.ObjectId

    
});

const Item = mongoose.model("items", ItemSchema)
export default Item;
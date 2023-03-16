
import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: String,
    description: String,
    price: {
        type: 'Number'
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },

});
//create table in the DB if not exist and return object 
const Item =mongoose.model("Item",ItemSchema);
export default Item;


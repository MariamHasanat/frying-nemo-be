import mongoose from "mongoose";
// const {Schema} from mongoose;
const ItemSchema = new mongoose.Schema(
// it will describe the types of fields 
{
    name: {
        type: String,
        require: true
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
    // addedBy : Schema.Types.ObjectId
});
const Item = mongoose.model("Item", ItemSchema);
export default Item;

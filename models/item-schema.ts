import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema(
    
// it will describe the types of fields 
{
    name: {
        type: String,
        require: true,
        unique : true
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

// create the model using this schema
const Item = mongoose.model("Item", ItemSchema);
//will create the table in db ,  and return some functions to deal with table 


export default Item;

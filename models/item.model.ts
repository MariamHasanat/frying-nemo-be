import mongoose, { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  description: String,
  price: {
    type: "Number",
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: [String],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User"
  }
  // addedBy: Schema.Types.ObjectId
});
const Item = mongoose.model("Item", ItemSchema);
export default Item;

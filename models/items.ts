import  mongoose  from "mongoose";
const mongooSchema = new mongoose.Schema({
 name: {
    type:String, 
    required :true,
    unique:true
 },
 imageUrl :String, 
 description:String,
 price:{
    type:Number,
    require:true

 },
 ingredient:{
    type:[String],
    default:[]
 },
 category:String
})
const Item = mongoose.model('Item',mongooSchema);
export default Item;
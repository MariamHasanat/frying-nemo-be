import  mongoose, { mongo }  from "mongoose";
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
 category:String,
 addedBy:{
   type:mongoose.Schema.Types.ObjectId,
   //type:'ObjectId'
   ref : 'User' }
})
const Item = mongoose.model('Item',mongooSchema);//برجع اوبجيكت  فيو التابل او بنشا واحد تانب 
export default Item;
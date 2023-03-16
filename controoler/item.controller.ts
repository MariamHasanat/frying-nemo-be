import Item from "../models/items.moddel.js";
import { ItemQuery } from "../types/index.js";


const getItem = async (params: ItemQuery) => {
//    const quary :any = {};

//    if ( params.maxPrice !== undefined){
//     quary.price = {$lte : params.maxPrice}
//    }


    const items = await Item.find({
     price:{
    $lte :20
    //params.maxPrice less than  or equal 
     }
    }
    );//return all items as a json if just () else no return specific 
    return (items);
}

const creatItem = (data: any) => {


}
export default {
    getItem,
    creatItem
}
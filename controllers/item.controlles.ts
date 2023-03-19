import { Item } from "../models/index";
import mongoose from "mongoose";
import { IItem,IItemQuery, IItemRequest } from "../types/index";

const getItems = async (params: IItemQuery) => {
    const query: mongoose.FilterQuery<IItem> = {};
    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }
    }
    if (params.category) {
        query.category = { $eq: params.category }
    }
    if (params.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i');

        query.$or = [
          { name: qReg },
          { description: qReg },
          { category: qReg },
          {
            ingredients :qReg
          }
          // {
          //   price: {
          //     $eq: 15
          //   }
          // }
        ]
       
    }

    const items = await Item.find(query);
    return items;

}

const creatItem = (req: IItemRequest) => {
    const newItem = new Item({
        name:req.body.name,
        category:req.body.category,
        ingredients:req.body.ingredients,
        description : req.body.description
    });
    newItem.price = req.body.price ||10;
    return newItem.save().then(()=>{
        return true;//created 
    }
    )
   


}
export default {
    getItems,
    creatItem
} 
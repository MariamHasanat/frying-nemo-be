import mongoose from "mongoose";
import Item from "../models/item.models.js"
import { IItem, IItemQuery, IItemRequest } from "../Type/index.js";

const getItems = async (params?: IItemQuery) => {
    const query : mongoose.FilterQuery<IItem> = {};

    if(params?.maxPrice !== undefined) {
        query.price = {$lte : params.maxPrice}
    }

    if(params?.category) {
        query.category = {$eq : params.category};
    }

    if(params?.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i');   

        query.$or = [
            { name : qReg } ,
            { category : qReg } ,
            { description : qReg}
        ]
    }
    const items = await Item.find(query);
    return items;
}

const creatItems = (req : IItemRequest) => {
 
      const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
        price: req.body.price
      });
    
      newItem.save()
        .then(() => {
          return true;
        })
      
}

export default {
      getItems ,
      creatItems
}
import mongoose from "mongoose";
import { IMenuItem } from "../interfaces/menuItems-interface";
import Item from "../models/item-schema"

const getItems = async (params: IMenuItem.IItemQuery) => {

    let query: mongoose.FilterQuery<typeof Item> = {};

    if (params.maxPrice !== undefined) {
        query = { ...query, price: { $lte: params.maxPrice } }
    }
   
    const categories = JSON.parse(params.categories || '[]')
   
    if (categories.length) {
        // query.category = { $eq: params.category } , this method will add an object names category to the query object -nested objects- , and add a value to this object
        query = { ...query, category: { $eq: categories } } // while this method says that, spread the values of query as it,and assign a new value to the category object which already exist in the object query 
    }
    if (params.searchTerms) {
        const queryRegex = new RegExp(params.searchTerms, 'i');
       
        // will receive an array
        query.$or = [
            {
                name: queryRegex
            },
            {
                description: queryRegex
            },
            {
                category: queryRegex
            },
            {
                ingredients: queryRegex
            }
        ]
    }

    return await Item.find(query);
}

const createItems = (item: IMenuItem.IItem) => {
    const newItem = new Item({
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        ingredients: item.ingredients,
        imageUrl: item.imageUrl
    })
    return newItem.save()
    .then(
      () => {
      return true
      }
    )
  
}

export default { getItems, createItems };